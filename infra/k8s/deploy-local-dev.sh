kubectl apply -f caption-database/caption-database-deployment.yaml
kubectl apply -f caption-database/caption-database-svc.yaml

kubectl apply -f redis-cache/redis-cache-deployment.yaml
kubectl apply -f redis-cache/redis-cache-svc.yaml

kubectl apply -f embedding-service/embedding-service-deployment.yaml
kubectl apply -f embedding-service/embedding-service-svc.yaml

kubectl apply -f index-service/index-service-deployment.yaml
kubectl apply -f index-service/index-service-svc.yaml

kubectl apply -f web-interface/web-interface-deployment.yaml
kubectl apply -f web-interface/web-interface-svc.yaml

kubectl apply -f api-gateway/api-gateway-deployment.yaml
kubectl apply -f api-gateway/api-gateway-svc.yaml

kubectl apply -f ingress-service.yaml
# kubectl port-forward --address 0.0.0.0 service/db-service 5432:5432
# kubectl port-forward --address 0.0.0.0 service/redis 6379:6379
