from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework.decorators import api_view, permission_classes, parser_classes
from rest_framework.parsers import MultiPartParser
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser
from django.contrib.auth.hashers import make_password
from .models import *
from .serilizers import *
from rest_framework_simplejwt.tokens import RefreshToken
from django.core.mail import send_mail, EmailMessage


# Create your views here.


def email_text(code: str):
    return """<html>
        <body>
            <h1>Welcome to Home finder</h1>
            <p>This is your verification code.</p>
            <p style="font-weight:bold">{code}</p>
            <p> If you haven't registered for home finder just ignore this message.</p>
        </body>
        </html>
        """.format(
        code=code
    )


@api_view(["POST"])
@permission_classes([AllowAny])
@parser_classes([MultiPartParser])
def register_user(request):
    data = request.data
    first_name: str = data.get("firstName", None)
    last_name: str = data.get("lastName", None)
    if not first_name or not last_name:
        return Response("enter first name and last name", status=400)
    p = data.get("password", None)
    if not p:
        return Response("password is required", status=400)
    password: str = make_password(p)
    profile = data.get("profile", None)
    phone = data.get("phone", None)
    username = data.get("username", None)
    if not username:
        return Response("username is required", status=400)
    email = data.get("email", None)
    if not email:
        return Response("email can not be empty", status=400)
    try:
        CustomUser.objects.get(username=username)
        return Response("username already exists", status=400)
    except:
        pass

    try:
        CustomUser.objects.get(email=email)
        return Response("email already used", status=400)
    except:
        pass

    try:
        CustomUser.objects.get(phone=phone)
        return Response("phone number already used", status=400)
    except:
        pass

    try:
        user = CustomUser.objects.create(
            first_name=first_name,
            last_name=last_name,
            password=password,
            username=username,
        )
        if profile:
            user.profile = profile
        if phone:
            user.phone = phone
        if email:
            user.email = email

        user.save()
    except Exception as e:
        print(e)
        return Response("failed to create user", status=500)

    refresh = RefreshToken.for_user(user)

    access_token = str(refresh.access_token)

    refresh_token = str(refresh)

    serilizer: UserSerilizer = UserSerilizer(user)

    data = {"access": access_token, "refresh": refresh_token, "user": serilizer.data}
    verification = Verification.objects.create(user=user)
    try:
        email = EmailMessage(
            "Verify home finder",
            email_text(verification.code),
            "noreply@gmail.com",
            ["nkaleabe001@gmail.com"],
        )
        email.content_subtype = "html"
        email.body = email_text(verification.code)
        email.send(fail_silently=False)
    except Exception as e:
        print(e)
        return Response("failed to send email", status=500)

    return Response(data, status=201)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_verification(request: Request):
    user = request.user
    if user.is_verified:
        return Response("user is already verified", status=400)
    try:
        prev = Verification.objects.get(user=user)
        prev.delete()
    except:
        pass
    verification = Verification.objects.create(user=user)
    try:
        email = EmailMessage(
            "Verify home finder",
            email_text(verification.code),
            "noreply@gmail.com",
            ["nkaleabe001@gmail.com"],
        )
        email.content_subtype = "html"
        email.body = email_text(verification.code)
        email.send(fail_silently=False)
    except Exception as e:
        print(e)
        return Response("failed to send email", status=500)
    return Response("verification email has been sent", status=200)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def verify(request: Request):
    code = request.data.get("code", None)
    code = code.replace("-", "")
    user = request.user
    try:
        verification = Verification.objects.get(code=code)
    except:
        return Response("verification not found", status=404)
    if verification.user != user:
        return Response(status=status.HTTP_401_UNAUTHORIZED)
    user.is_verified = True
    user.save()
    verification.delete()
    return Response("user verified", status=200)


# @api_view(["GET"])
# @permission_classes([IsAuthenticated])
# def superize(request: Request) -> Response:
#     user: CustomUser = request.user
#     user.is_staff = True
#     user.is_superuser = True

#     user.save()
#     return Response("superized")
