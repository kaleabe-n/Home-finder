from datetime import timedelta
from rest_framework_simplejwt.tokens import Token
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


def custom_payload_handler(user):
    """
    Custom payload handler function.
    """
    return {
        "username": user.username,
        "email": user.email,
        "is_active": user.is_active,
        # "exp": Token.current_time() + timedelta(hours=1),  # Token expiration time
    }


Token.payload_handler = custom_payload_handler




class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Customize the token payload
        token["email"] = user.email
        token['is_verified'] = user.is_verified
        try:
            token["profile"] = user.profile.url 
        except:
            token['profile'] = None
        try:
            token["phone"] = user.phone
        except:
            token["phone"] = None

        return token


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

    def post(self, request, *args, **kwargs):
        # Your custom logic, if needed
        return super().post(request, *args, **kwargs)
