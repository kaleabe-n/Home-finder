from django.db import models
from user.models import CustomUser

# Create your models here.


def upload(_, file_name):
    return "properties/{file_name}".format(file_name=file_name)


class Address(models.Model):
    region = models.CharField(max_length=30,null=True,blank=True)
    city = models.CharField(max_length=30,null=True,blank=True)
    zone = models.CharField(max_length=30,null=True,blank=True)
    specific_location = models.CharField(max_length=40,null=True,blank=True)
    
class Type(models.Model):
    name = models.CharField(max_length=30)

class Property(models.Model):
    class Choices(models.IntegerChoices):
        ZERO = 0, "zero"
        ONE = 1, "one"
        TWO = 2, "two"
        THREE = 3, "three"
        FOUR = 4, "four"
        FIVE = 5, "five"
        SIX = 6, "six"
        SEVEN = 7, "seven"
        EIGHT = 8, "eight"
        NINE = 9, "nine"
        TEN = 10, "ten"

    address = models.ForeignKey(to=Address, on_delete=models.CASCADE)
    price = models.IntegerField()
    bed_rooms = models.IntegerField(choices=Choices.choices, default=Choices.ZERO)
    bath_rooms = models.IntegerField(choices=Choices.choices, default=Choices.ZERO)
    house_area = models.FloatField()
    land_area = models.FloatField(null=True, blank=True)
    floors = models.IntegerField(null=True, blank=True)
    parking = models.IntegerField(null=True, blank=True)
    is_furnished = models.BooleanField(default=False)
    posted_by = models.ForeignKey(to=CustomUser, on_delete=models.CASCADE)
    updated = models.DateTimeField(auto_now=True)
    property_type = models.ForeignKey(to=Type,on_delete=models.SET_NULL,null=True,related_name="property_type")
    is_sold = models.BooleanField(default=False)

    class Meta:
        ordering = ["-updated"]


class PropertyImage(models.Model):
    image = models.ImageField(upload_to=upload)
    property = models.ForeignKey(to=Property, on_delete=models.CASCADE)
