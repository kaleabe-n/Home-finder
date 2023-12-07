from rest_framework.serializers import ModelSerializer
from .models import *


class UserSerilizer(ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ["username", "email", "phone", "profile", "first_name", "last_name"]
