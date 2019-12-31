from django.db import models


class ClientCountry(models.Model):
    country = models.CharField(max_length=200, unique=True)

    class Meta:
        verbose_name_plural = "Client Countries"

    def __str__(self):
        return self.country

