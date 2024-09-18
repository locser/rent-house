echo "Building application........................"

docker build . -t vn.locser.doan:1.0.0

docker-compose up -d

