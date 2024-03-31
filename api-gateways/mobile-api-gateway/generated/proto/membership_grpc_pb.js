// GENERATED CODE -- DO NOT EDIT!

"use strict";
var grpc = require("@grpc/grpc-js");
var membership_pb = require("./membership_pb.js");

function serialize_CreateMembershipRequest(arg) {
  if (!(arg instanceof membership_pb.CreateMembershipRequest)) {
    throw new Error("Expected argument of type CreateMembershipRequest");
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_CreateMembershipRequest(buffer_arg) {
  return membership_pb.CreateMembershipRequest.deserializeBinary(
    new Uint8Array(buffer_arg)
  );
}

function serialize_DeleteMembershipRequest(arg) {
  if (!(arg instanceof membership_pb.DeleteMembershipRequest)) {
    throw new Error("Expected argument of type DeleteMembershipRequest");
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_DeleteMembershipRequest(buffer_arg) {
  return membership_pb.DeleteMembershipRequest.deserializeBinary(
    new Uint8Array(buffer_arg)
  );
}

function serialize_DeleteMembershipResponse(arg) {
  if (!(arg instanceof membership_pb.DeleteMembershipResponse)) {
    throw new Error("Expected argument of type DeleteMembershipResponse");
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_DeleteMembershipResponse(buffer_arg) {
  return membership_pb.DeleteMembershipResponse.deserializeBinary(
    new Uint8Array(buffer_arg)
  );
}

function serialize_GetMembershipRequest(arg) {
  if (!(arg instanceof membership_pb.GetMembershipRequest)) {
    throw new Error("Expected argument of type GetMembershipRequest");
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_GetMembershipRequest(buffer_arg) {
  return membership_pb.GetMembershipRequest.deserializeBinary(
    new Uint8Array(buffer_arg)
  );
}

function serialize_MembershipResponse(arg) {
  if (!(arg instanceof membership_pb.MembershipResponse)) {
    throw new Error("Expected argument of type MembershipResponse");
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_MembershipResponse(buffer_arg) {
  return membership_pb.MembershipResponse.deserializeBinary(
    new Uint8Array(buffer_arg)
  );
}

function serialize_UpdateMembershipRequest(arg) {
  if (!(arg instanceof membership_pb.UpdateMembershipRequest)) {
    throw new Error("Expected argument of type UpdateMembershipRequest");
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_UpdateMembershipRequest(buffer_arg) {
  return membership_pb.UpdateMembershipRequest.deserializeBinary(
    new Uint8Array(buffer_arg)
  );
}

var MembershipServiceService = (exports.MembershipServiceService = {
  createMembership: {
    path: "/ita.membershipservice.MembershipService/createMembership",
    requestStream: false,
    responseStream: false,
    requestType: membership_pb.CreateMembershipRequest,
    responseType: membership_pb.MembershipResponse,
    requestSerialize: serialize_CreateMembershipRequest,
    requestDeserialize: deserialize_CreateMembershipRequest,
    responseSerialize: serialize_MembershipResponse,
    responseDeserialize: deserialize_MembershipResponse,
  },
  getMembership: {
    path: "/ita.membershipservice.MembershipService/getMembership",
    requestStream: false,
    responseStream: false,
    requestType: membership_pb.GetMembershipRequest,
    responseType: membership_pb.MembershipResponse,
    requestSerialize: serialize_GetMembershipRequest,
    requestDeserialize: deserialize_GetMembershipRequest,
    responseSerialize: serialize_MembershipResponse,
    responseDeserialize: deserialize_MembershipResponse,
  },
  deleteMembership: {
    path: "/ita.membershipservice.MembershipService/deleteMembership",
    requestStream: false,
    responseStream: false,
    requestType: membership_pb.DeleteMembershipRequest,
    responseType: membership_pb.DeleteMembershipResponse,
    requestSerialize: serialize_DeleteMembershipRequest,
    requestDeserialize: deserialize_DeleteMembershipRequest,
    responseSerialize: serialize_DeleteMembershipResponse,
    responseDeserialize: deserialize_DeleteMembershipResponse,
  },
  updateMembership: {
    path: "/ita.membershipservice.MembershipService/updateMembership",
    requestStream: false,
    responseStream: false,
    requestType: membership_pb.UpdateMembershipRequest,
    responseType: membership_pb.MembershipResponse,
    requestSerialize: serialize_UpdateMembershipRequest,
    requestDeserialize: deserialize_UpdateMembershipRequest,
    responseSerialize: serialize_MembershipResponse,
    responseDeserialize: deserialize_MembershipResponse,
  },
});

exports.MembershipServiceClient = grpc.makeGenericClientConstructor(
  MembershipServiceService
);
