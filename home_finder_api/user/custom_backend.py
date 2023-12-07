from typing import Any
from django.contrib.auth.backends import BaseBackend
from django.contrib.auth.base_user import AbstractBaseUser
from django.http.request import HttpRequest
from .models import CustomUser


class CustomBackend(BaseBackend):
    def authenticate(
        self,
        request: HttpRequest,
        username: str | None = ...,
        password: str | None = ...,
        **kwargs: Any
    ) -> AbstractBaseUser | None:
        try:
            user: CustomUser = CustomUser.objects.get(username=username)
            if user.check_password(password):
                return user
        except CustomUser.DoesNotExist:
            return None
        return None

    def get_user(self, username: str):
        try:
            user: CustomUser = CustomUser.objects.get(username=username)
            return user
        except CustomUser.DoesNotExist:
            return None
