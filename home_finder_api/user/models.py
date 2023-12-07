from typing import Any
from django.db import models
from django.contrib.auth.models import AbstractUser, Group, Permission
import uuid

# Create your models here.


def upload(_, file_name):
    return "profiles/{file_name}".format(file_name=file_name)


class CustomUser(AbstractUser, models.Model):
    phone = models.CharField(max_length=20,blank=True)
    profile = models.ImageField(upload_to=upload,blank=True)
    username = models.CharField(max_length=30,primary_key=True)
    is_verified = models.BooleanField(default=False)

    def __init__(self, *args: Any, **kwargs: Any) -> None:
        super().__init__(*args, **kwargs)

    def set_phone(self, phone: str):
        self.phone = phone
        self.save()

    def set_profile(self, profile):
        self.profile = profile
        self.save()

    # Add any additional fields or methods to your custom user model

    class Meta:
        # Provide a unique related_name for the groups field
        # This differentiates it from the reverse accessor in the default User model
        db_table = "my_custom_user_table"
        verbose_name = "Custom User"
        verbose_name_plural = "Custom Users"
        permissions = []

        # Add a unique related_name for the groups field
        # This differentiates it from the reverse accessor in the default User model
        unique_together = ["username"]

    groups = models.ManyToManyField(
        Group,
        verbose_name="groups",
        blank=True,
        help_text="The groups this user belongs to.",
        related_name="custom_users",  # Provide a unique related_name
        related_query_name="custom_user",
    )

    user_permissions = models.ManyToManyField(
        Permission,
        verbose_name="user permissions",
        blank=True,
        help_text="Specific permissions for this user.",
        related_name="custom_users",  # Provide a unique related_name
        related_query_name="custom_user",
    )


class Verification(models.Model):
    user = models.ForeignKey(to=CustomUser,on_delete=models.CASCADE)
    code = models.UUIDField(primary_key=True,default=uuid.uuid4,unique=True)
