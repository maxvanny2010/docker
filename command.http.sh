  #!/bin/bash
  # Путь к директории
EXEC_FOLDER="/path/to/your/project"
cd $EXEC_FOLDER
  # Шаг 1: Запуск Nginx с временной HTTP-конфигурацией
echo "Starting Nginx with HTTP config..."
cp nginx/default_http.conf nginx/default.conf
docker compose up -d nginx

  # Шаг 2: Получение сертификата
echo "Running Certbot to get certificate..."
docker compose run --rm certbot certonly --webroot -w /var/www/certbot -d yourdomain.com --email you@example.com --agree-tos --no-eff-email --non-interactive

  # Шаг 3: Перезапуск Nginx с HTTPS-конфигурацией
echo "Switching to HTTPS config and restarting Nginx..."
cp nginx/default_https.conf nginx/default.conf
docker compose restart nginx

echo "Process completed."