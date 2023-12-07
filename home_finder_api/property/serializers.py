from rest_framework.serializers import ModelSerializer, SerializerMethodField
from .models import *


class AddressSerializer(ModelSerializer):
    class Meta:
        model = Property
        fields = "__all__"


class TypeSerializer(ModelSerializer):
    class Meta:
        model = Type
        fields = "__all__"


class PropertySerializer(ModelSerializer):
    address = SerializerMethodField()
    posted_by = SerializerMethodField()
    photos = SerializerMethodField()
    type = SerializerMethodField()

    def get_type(self, property: Property):
        type: Type = property.property_type
        type_serializer: TypeSerializer = TypeSerializer(type)
        return type_serializer.data

    def get_address(self, property: Property):
        data = property.address.__dict__
        data.pop("_state")
        return data

    def get_posted_by(self, property: Property):
        user = property.posted_by
        data = {}
        try:
            data["profile"] = user.profile.url
        except:
            data["profile"] = None
        data["phone"] = user.phone
        data["username"] = user.username
        data["is_verified"] = user.is_verified
        return data

    def get_photos(self, property: Property):
        paths = []
        photos = PropertyImage.objects.filter(property=property)
        for photo in photos:
            paths.append(photo.image.url)
        return paths

    class Meta:
        model = Property
        fields = [
            "id",
            "address",
            "price",
            "bed_rooms",
            "bath_rooms",
            "house_area",
            "land_area",
            "floors",
            "parking",
            "is_furnished",
            "posted_by",
            "photos",
            "type",
            "is_sold",
        ]
