# Generated by Django 4.2.6 on 2023-10-31 06:14

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('accountmanagement', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='transaction',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('amount', models.DecimalField(decimal_places=2, default=0.0, max_digits=10)),
                ('trans_type', models.CharField(max_length=25)),
                ('trans_date', models.DateField(auto_now_add=True)),
                ('acc', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='accountmanagement.account')),
            ],
        ),
    ]
