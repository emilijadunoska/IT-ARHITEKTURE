# Fitness Center Management 🏋️‍♂️📅

A microservices-based application for fitness center management that handles users, memberships, and group classes. 

## Services

The application consists of the following microservices:

1. **User Management Service:** Responsible for user authentication, authorization, and profile management.
2. **Memberships Management Service:** Manages memberships and membership-related activities.
3. **Group Classes Service:** Handles group classes booking, and availability.

# 1. User Management Service

The User Management Service provides a RESTful API for user management, built with Spring boot and MongoDB. 

## How to run:
```
cd user-service/user-service
docker-compose up
```
Once the service is running, you can access it at [http://localhost:8080](http://localhost:8080).

# 2. Memberships Management Service

The Memberships Management Service provides a gRPC interface for managing user memberships, built using Quarkus and MongoDB. 

## How to run:
```
cd membership-service
docker-compose up
```
Once the service is running, you can access it at [grpc://localhost:8080](grpc://localhost:8080).

# 3. Group Classes Service

The Group Classes Service offers a reactive REST API for managing group class bookings and availability, built with Quarkus And MongoDB. 

## How to run:
```
cd group-classes-service
docker-compose up
```
Once the service is running, you can access it at [http://localhost:8080](http://localhost:8080).
