from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes, parser_classes
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAdminUser
from rest_framework.parsers import MultiPartParser
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework import status
from .views import *
from .models import *
from .serializers import *
from django.db.models import Q, When, Case, IntegerField, F

# Create your views here.


@api_view(["GET", "POST"])
@permission_classes([IsAuthenticated])
def types_api(request: Request) -> Response:
    if request.method == "GET":
        types = Type.objects.all()
        serilizer = TypeSerializer(types, many=True)

        return Response(serilizer.data)
    if request.method == "POST":
        name = request.data.get("name", None)
        if not name:
            return Response("property type name is required", status=400)
        previous_types = Type.objects.filter(name=name)
        if previous_types:
            return Response("name already exists", status=400)
        try:
            new_type: Type = Type.objects.create(name=name)
        except Exception as e:
            return Response("unknown error while creating type", status=500)
        serilizer: Type = TypeSerializer(new_type)
        return Response(serilizer.data)


@api_view(["PUT", "DELETE", "PATCH", "GET"])
@permission_classes([IsAuthenticated])
def modify_types(request: Request, pk) -> Response:
    if request.method == "PUT" or request.method == "PATCH":
        name = request.data.get("name", None)
        if not name:
            return Response("property type name is required", status=400)
        try:
            type: Type = Type.objects.get(id=pk)
            type.name = name
            type.save()
            serilizer: TypeSerializer = TypeSerializer(type)
            return Response(serilizer.data)
        except Type.DoesNotExist as e:
            return Response("type not found", status=404)
    if request.method == "DELETE":
        try:
            type: Type = Type.objects.get(id=pk)
            try:
                type.delete()
            except Exception as e:
                return Response("failed to delete type", status=500)
            return Response("type deleted successfully")
        except Type.DoesNotExist as e:
            return Response("type not found", status=404)
    if request.method == "GET":
        try:
            type: Type = Type.objects.get(id=pk)
            serilizer: TypeSerializer = TypeSerializer(type)
            return Response(serilizer.data)
        except Type.DoesNotExist:
            return Response("Type not found", status=404)


@api_view(["GET", "POST"])
@permission_classes([IsAuthenticated])
@parser_classes([MultiPartParser])
def properties_api(request: Request) -> Response:
    if request.method == "GET":
        params = request.query_params
        page = int(params.get("page", 1))
        page -= 1
        per_page = int(params.get("perPage", 10000000))
        try:
            props = Property.objects.filter(is_sold=False)
        except:
            return Response(status=500)
        total_count = props.count()
        page_props = props[page * per_page : (page + 1) * per_page]
        serializer = PropertySerializer(page_props, many=True)
        return Response({"total": total_count, "data": serializer.data})
    elif request.method == "POST":
        if not request.user.is_verified:
            return Response(
                "you have to verify your account to post property", status=403
            )
        data = request.data
        address_fields = {
            "region": data.get("region", None),
            "city": data.get("city", None),
            "zone": data.get("zone", None),
            "specific_location": data.get("specificLocation", None),
        }
        address: Address = Address(**address_fields)
        address.save()
        try:
            type_id = data.get("type", None)
            if type_id is not None:
                try:
                    type_instance = Type.objects.get(id=type_id)
                except Type.DoesNotExist:
                    type_instance = None
            else:
                type_instance = None
            if data.get("house_area", None) is None:
                return Response("house area is required", status=400)
            prop: Property = Property.objects.create(
                property_type=type_instance,
                posted_by=request.user,
                address=address,
                price=data.get("price", None),
                bed_rooms=data.get("bed_rooms", None),
                bath_rooms=data.get("bath_rooms", None),
                land_area=data.get("land_area", None),
                floors=data.get("floors", None),
                parking=data.get("parking", None),
                is_furnished=data.get("is_furnished", None),
                house_area=data.get("house_area"),
                description=data.get("description","no description")
            )
            if data.get("photos", False):
                photos = dict((request.FILES).lists()).get("photos", None)
                for photo in photos:
                    propertyImage: PropertyImage = PropertyImage(
                        image=photo, property=prop
                    )
                    propertyImage.save()
            serializer: PropertySerializer = PropertySerializer(prop)
            return Response(serializer.data, status=201)
        except Exception as e:
            print(e)
            return Response(status=400)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def sold_properties(request: Request) -> Response:
    params = request.query_params
    page = int(params.get("page", 1))
    page -= 1
    per_page = int(params.get("perPage", 10000000))
    try:
        props = Property.objects.filter(is_sold=True)
    except:
        return Response(status=500)
    total_count = props.count()
    page_props = props[page * per_page : (page + 1) * per_page]
    serializer = PropertySerializer(page_props, many=True)
    return Response({"total": total_count, "data": serializer.data})


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_my_properties(request: Request) -> Response:
    params = request.query_params
    page = int(params.get("page", 1))
    page -= 1
    per_page = int(params.get("perPage", 10000000))
    try:
        props = Property.objects.filter(posted_by=request.user)
    except:
        return Response(status=500)
    total_count = props.count()
    page_props = props[page * per_page : (page + 1) * per_page]
    serializer = PropertySerializer(page_props, many=True)
    return Response({"total": total_count, "data": serializer.data})


@api_view(["DELETE", "PUT", "GET"])
@permission_classes([IsAuthenticated])
def property_detail_api(request: Request, pk: str) -> Response:
    user: CustomUser = request.user
    try:
        property: Property = Property.objects.get(id=pk)
    except Property.DoesNotExist:
        return Response("property does not exits", status=404)

    if (not user.is_superuser) and (property.posted_by is not user) and request.method!="GET":
        return Response(
            "unauthorized access make sure you are the owner of the property",
            status=403,
        )
    if request.method == "PUT":
        serilizer: PropertySerializer = PropertySerializer(property, data=request.data)
        if serilizer.is_valid():
            serilizer.save()
            return Response(serilizer.data)
        return Response("error parsing data", status=400)
    if request.method == "DELETE":
        try:
            property.delete()
            return Response("property deleted")
        except:
            return Response("failed to delete property", status=500)
    if request.method == "GET":
        serilizer: PropertySerializer = PropertySerializer(property)
        return Response(serilizer.data)


@api_view(["PATCH"])
@permission_classes([IsAuthenticated])
def toggle_sold(request: Request, pk: str):
    user: CustomUser = request.user
    try:
        property: Property = Property.objects.get(id=pk)
    except Property.DoesNotExist:
        return Response("property does not exits", status=404)

    if (not user.is_superuser) and (property.posted_by is not user):
        return Response(
            "unauthorized access make sure you are the owner of the property",
            status=403,
        )
    try:
        property.is_sold = True
        property.save()
        serilizer: PropertySerializer = PropertySerializer(property)
        return Response(serilizer.data, status=status.HTTP_200_OK)
    except:
        return Response(
            "failed to update", status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_filtered_properties(request: Request) -> Response:
    queries: dict = request.GET
    query_filters: [] = []

    for key, val in queries.items():
        if key.startswith("min"):
            curr_query = "_".join(key.split("_")[1:])
            query_filters.append(Q(**{f"{curr_query}__gte": val}))
        elif key.startswith("max"):
            curr_query = "_".join(key.split("_")[1:])
            query_filters.append(Q(**{f"{curr_query}__lte": val}))
        elif key == "type":
            query_filters.append(Q(property_type=Type.objects.get(name=val)))
        elif key in ["city", "zone", "region", "specific_location"]:
            addresses: [Address] = Address.objects.filter(**{f"{key}__icontains": val})
            query_filters.append(Q(address__in=addresses))
        else:
            query_filters.append(Q(**{key: val}))

    params = request.GET
    page = int(params.get("page", 1))
    page -= 1
    per_page = int(params.get("perPage", 10000000))
    props = Property.objects.filter(*query_filters)
    total_count = props.count()
    page_props = props[page * per_page : (page + 1) * per_page]
    serializer = PropertySerializer(page_props, many=True)
    return Response({"total": total_count, "data": serializer.data})

    # query_filters = Q()
    # sorting_conditions = []

    # for key, value in request.GET.items():
    #     if key in ["city", "zone", "region", "specific_location"]:
    #         print(key)
    #         kwargs: dict = {f"{key}__icontains": value}
    #         addresses: [Address] = Address.objects.filter(**kwargs)
    #         query_filters |= Q(**{f"address__in": addresses})
    #         sorting_conditions.append(
    #             When(**{f"address__in": addresses}, then=F("num_matches") + 1)
    #         )
    #     elif key in ["min_price", "min_house_area", "min_land_area"]:
    #         print(key)
    #         prop_name: str = "_".join(key.split("_")[1:])
    #         query_filters |= Q(**{f"{prop_name}__gte": value})
    #         sorting_conditions.append(
    #             When(**{f"{prop_name}__gte": value}, then=F("num_matches") + 1)
    #         )
    #     elif key in ["max_price", "max_house_area", "max_land_area"]:
    #         print(key)
    #         prop_name: str = "_".join(key.split("_")[1:])
    #         query_filters |= Q(**{f"{prop_name}__lte": value})
    #         sorting_conditions.append(
    #             When(**{f"{prop_name}__lte": value}, then=F("num_matches") + 1)
    #         )
    #     elif key in ["bath_rooms", "bed_rooms"]:
    #         print(key)
    #         query_filters |= Q(**{f"{key}__exact": value})
    #         sorting_conditions.append(
    #             When(**{f"{key}__exact": value}, then=F("num_matches") + 1)
    #         )
    #     elif key == "type":
    #         print(key)
    #         type: Type = Type.objects.get(name=value)
    #         query_filters |= Q(**{f"property_type__exact": type})
    #         sorting_conditions.append(When(**{f"property_type__exact": type}, then=1))

    # instances = (
    #     Property.objects.annotate(
    #         num_matches=Case(
    #             *sorting_conditions, default=0, output_field=IntegerField()
    #         )
    #     )
    #     .filter((query_filters) & Q(num_matches__gt=0) & Q(is_sold=False))
    #     .order_by("-num_matches")
    # )
    # # print(sorting_conditions)
    # # print([(i.id, i.num_matches) for i in instances])

    # serilizer: PropertySerializer = PropertySerializer(instances, many=True)
    # return Response(serilizer.data)
