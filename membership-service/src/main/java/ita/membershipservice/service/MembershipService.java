package ita.membershipservice.service;

import io.grpc.Status;
import io.grpc.stub.StreamObserver;
import io.quarkus.grpc.GrpcService;
import ita.membershipservice.MembershipServiceGrpc;
import ita.membershipservice.repository.MembershipRepository;
import jakarta.inject.Inject;
import ita.membershipservice.Membership;
import org.bson.types.ObjectId;

@GrpcService
public class MembershipService extends MembershipServiceGrpc.MembershipServiceImplBase {

    @Inject
    MembershipRepository membershipRepository;

    @Override
    public void createMembership(Membership.CreateMembershipRequest request, StreamObserver<Membership.MembershipResponse> responseObserver) {
        ita.membershipservice.model.Membership membership = new ita.membershipservice.model.Membership(
                request.getUserId(),
                request.getType(),
                request.getPrice(),
                request.getStartDate(),
                request.getEndDate()
        );

        ObjectId id = new ObjectId();
        membership.setId(id);
        membershipRepository.persist(membership);
        Membership.MembershipResponse response = Membership.MembershipResponse.newBuilder()
                .setId(membership.getId().toHexString())
                .setUserId(membership.getUserId())
                .setType(membership.getType())
                .setPrice(membership.getPrice())
                .setStartDate(membership.getStartDate())
                .setEndDate(membership.getEndDate())
                .build();
        responseObserver.onNext(response);
        responseObserver.onCompleted();
    }


    @Override
    public void getMembership(Membership.GetMembershipRequest request, StreamObserver<Membership.MembershipResponse> responseObserver) {
        String membershipId = request.getId();
        ObjectId objectId = new ObjectId(membershipId);

        ita.membershipservice.model.Membership membership = membershipRepository.findById(objectId);

        if (membership != null) {
            Membership.MembershipResponse response = Membership.MembershipResponse.newBuilder()
                    .setId(membership.getId().toHexString())
                    .setUserId(membership.getUserId())
                    .setType(membership.getType())
                    .setPrice(membership.getPrice())
                    .setStartDate(membership.getStartDate())
                    .setEndDate(membership.getEndDate())
                    .build();
            responseObserver.onNext(response);
            responseObserver.onCompleted();
        } else {
            System.out.println("Membership with ID " + membershipId + " not found");
            responseObserver.onError(Status.NOT_FOUND.asRuntimeException());
        }
    }


    @Override
    public void deleteMembership(Membership.DeleteMembershipRequest request, StreamObserver<Membership.DeleteMembershipResponse> responseObserver) {
        String membershipId = request.getId();
        ObjectId objectId = new ObjectId(membershipId);

        boolean success = membershipRepository.deleteById(objectId);

        if (success) {
            System.out.println("Membership deleted successfully");
        } else {
            System.out.println("Failed to delete membership");
        }

        Membership.DeleteMembershipResponse response = Membership.DeleteMembershipResponse.newBuilder()
                .setSuccess(success)
                .build();

        responseObserver.onNext(response);
        responseObserver.onCompleted();
    }

    @Override
    public void updateMembership(Membership.UpdateMembershipRequest request, StreamObserver<Membership.MembershipResponse> responseObserver) {
        String membershipId = request.getId();
        ObjectId objectId = new ObjectId(membershipId);

        ita.membershipservice.model.Membership membership = membershipRepository.findById(objectId);

        if (membership != null) {
            if (request.hasUserId()) {
                membership.setUserId(request.getUserId());
            }
            if (request.hasType()) {
                membership.setType(request.getType());
            }
            if (request.hasPrice()) {
                membership.setPrice(request.getPrice());
            }
            if (request.hasStartDate()) {
                membership.setStartDate(request.getStartDate());
            }
            if (request.hasEndDate()) {
                membership.setEndDate(request.getEndDate());
            }

            membership.setId(objectId);
            membershipRepository.update(membership);

            Membership.MembershipResponse response = Membership.MembershipResponse.newBuilder()
                    .setId(membership.getId().toHexString())
                    .setUserId(membership.getUserId())
                    .setType(membership.getType())
                    .setPrice(membership.getPrice())
                    .setStartDate(membership.getStartDate())
                    .setEndDate(membership.getEndDate())
                    .build();

            responseObserver.onNext(response);
            responseObserver.onCompleted();
        } else {
            System.out.println("Membership with ID " + membershipId + " not found");
            responseObserver.onError(Status.NOT_FOUND.asRuntimeException());
        }
    }




}
