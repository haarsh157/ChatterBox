# 🗨️ Chatterbox 

Chatterbox is a real-time messaging application built with **Next.js**, **Socket.io**, **Redis (for queue management)**, and **MongoDB (via Prisma ORM)**.  
Authentication is handled by **Clerk.js**, and the application is containerized using **Docker** and deployed locally on **Minikube (Kubernetes)**.


## 🚀 Features

- Real-time messaging using **Socket.io**
- User authentication with **Clerk**
- Persistent message storage with **MongoDB**
- Redis-based message queue system
- Scalable deployment using **Docker** and **Kubernetes**
- SSR with Next.js

## 🧱 Tech Stack

| Layer              | Technology |
|--------------------|-------------|
| Frontend & Backend | Next.js |
| Authentication     | Clerk.js |
| Database           | MongoDB + Prisma |
| Message Queue      | Redis |
| Real-Time Engine   | Socket.io |
| Containerization   | Docker |
| Orchestration      | Kubernetes (Minikube) |

---


## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/<your-username>/chatterbox.git
cd chatterbox
```
### 2. Configure Environment Variables

#### 🐳 Run with Docker
Build the Docker image
```bash
docker build -t chatterbox:latest .
```
Run the container
```bash
docker run -d -p 3000:3000 chatterbox:latest
```

### ☸️ Deploy on Minikube (Kubernetes)

#### 1. Start Minikube
```bash
minikube start
```
#### 2. Enable Docker inside Minikube
```bash
eval $(minikube docker-env)
```

#### 3. Build Docker Image inside Minikube
```bash
docker build -t chatterbox:latest .
```

#### 4. Apply Kubernetes Configuration
```bash
kubectl apply -f k8s/
```

#### 5. Verify Deployment
```bash
kubectl get pods
kubectl get services
```

#### 6. Access the App
```bash
minikube service chatterbox-service
```