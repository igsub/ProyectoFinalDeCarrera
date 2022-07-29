# ProyectoFinalDeCarrera

### Comando para ejecutar el ambiente de desarrollo

```bash
docker-compose -f docker-compose.dev.yml up --build --remove-orphans
```

### Comando para buildear imagen de backend

```bash
cd server
docker build -t igsub/pfc-backend:[tag] -f Dockerfile.prod .
```

### Comando para buildear imagen de frontend

```bash
cd client
docker build -t igsub/pfc-frontend:[tag] -f Dockerfile.prod --build-arg NODE_ENV=production .
```
