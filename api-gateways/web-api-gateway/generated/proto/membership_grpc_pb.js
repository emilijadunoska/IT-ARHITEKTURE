// GENERATED CODE -- DO NOT EDIT!

"use strict";
var grpc = require("@grpc/grpc-js");
var membership_pb = require("./membership_pb.js");

function serialize_ita_membershipservice_CreateMembershipRequest(arg) {
  if (!(arg instanceof membership_pb.CreateMembershipRequest)) {
    throw new Error(
      "Expected argument of type ita.membershipservice.CreateMembershipRequest"
    );
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_ita_membershipservice_CreateMembershipRequest(buffer_arg) {
  return membership_pb.CreateMembershipRequest.deserializeBinary(
    new Uint8Array(buffer_arg)
  );
}

function serialize_ita_membershipservice_DeleteMembershipRequest(arg) {
  if (!(arg instanceof membership_pb.DeleteMembershipRequest)) {
    throw new Error(
      "Expected argument of type ita.membershipservice.DeleteMembershipRequest"
    );
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_ita_membershipservice_DeleteMembershipRequest(buffer_arg) {
  return membership_pb.DeleteMembershipRequest.deserializeBinary(
    new Uint8Array(buffer_arg)
  );
}

function serialize_ita_membershipservice_DeleteMembershipResponse(arg) {
  if (!(arg instanceof membership_pb.DeleteMembershipResponse)) {
    throw new Error(
      "Expected argument of type ita.membershipservice.DeleteMembershipResponse"
    );
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_ita_membershipservice_DeleteMembershipResponse(
  buffer_arg
) {
  return membership_pb.DeleteMembershipResponse.deserializeBinary(
    new Uint8Array(buffer_arg)
  );
}

function serialize_ita_membershipservice_GetMembershipByUserIdRequest(arg) {
  if (!(arg instanceof membership_pb.GetMembershipByUserIdRequest)) {
    throw new Error(
      "Expected argument of type ita.membershipservice.GetMembershipByUserIdRequest"
    );
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_ita_membershipservice_GetMembershipByUserIdRequest(
  buffer_arg
) {
  return membership_pb.GetMembershipByUserIdRequest.deserializeBinary(
    new Uint8Array(buffer_arg)
  );
}

function serialize_ita_membershipservice_GetMembershipRequest(arg) {
  if (!(arg instanceof membership_pb.GetMembershipRequest)) {
    throw new Error(
      "Expected argument of type ita.membershipservice.GetMembershipRequest"
    );
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_ita_membershipservice_GetMembershipRequest(buffer_arg) {
  return membership_pb.GetMembershipRequest.deserializeBinary(
    new Uint8Array(buffer_arg)
  );
}

function serialize_ita_membershipservice_MembershipResponse(arg) {
  if (!(arg instanceof membership_pb.MembershipResponse)) {
    throw new Error(
      "Expected argument of type ita.membershipservice.MembershipResponse"
    );
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_ita_membershipservice_MembershipResponse(buffer_arg) {
  return membership_pb.MembershipResponse.deserializeBinary(
    new Uint8Array(buffer_arg)
  );
}

function serialize_ita_membershipservice_UpdateMembershipRequest(arg) {
  if (!(arg instanceof membership_pb.UpdateMembershipRequest)) {
    throw new Error(
      "Expected argument of type ita.membershipservice.UpdateMembershipRequest"
    );
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_ita_membershipservice_UpdateMembershipRequest(buffer_arg) {
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
    requestSerialize: serialize_ita_membershipservice_CreateMembershipRequest,
    requestDeserialize:
      deserialize_ita_membershipservice_CreateMembershipRequest,
    responseSerialize: serialize_ita_membershipservice_MembershipResponse,
    responseDeserialize: deserialize_ita_membershipservice_MembershipResponse,
  },
  getMembership: {
    path: "/ita.membershipservice.MembershipService/getMembership",
    requestStream: false,
    responseStream: false,
    requestType: membership_pb.GetMembershipRequest,
    responseType: membership_pb.MembershipResponse,
    requestSerialize: serialize_ita_membershipservice_GetMembershipRequest,
    requestDeserialize: deserialize_ita_membershipservice_GetMembershipRequest,
    responseSerialize: serialize_ita_membershipservice_MembershipResponse,
    responseDeserialize: deserialize_ita_membershipservice_MembershipResponse,
  },
  deleteMembership: {
    path: "/ita.membershipservice.MembershipService/deleteMembership",
    requestStream: false,
    responseStream: false,
    requestType: membership_pb.DeleteMembershipRequest,
    responseType: membership_pb.DeleteMembershipResponse,
    requestSerialize: serialize_ita_membershipservice_DeleteMembershipRequest,
    requestDeserialize:
      deserialize_ita_membershipservice_DeleteMembershipRequest,
    responseSerialize: serialize_ita_membershipservice_DeleteMembershipResponse,
    responseDeserialize:
      deserialize_ita_membershipservice_DeleteMembershipResponse,
  },
  updateMembership: {
    path: "/ita.membershipservice.MembershipService/updateMembership",
    requestStream: false,
    responseStream: false,
    requestType: membership_pb.UpdateMembershipRequest,
    responseType: membership_pb.MembershipResponse,
    requestSerialize: serialize_ita_membershipservice_UpdateMembershipRequest,
    requestDeserialize:
      deserialize_ita_membershipservice_UpdateMembershipRequest,
    responseSerialize: serialize_ita_membershipservice_MembershipResponse,
    responseDeserialize: deserialize_ita_membershipservice_MembershipResponse,
  },
  getMembershipByUserId: {
    path: "/ita.membershipservice.MembershipService/getMembershipByUserId",
    requestStream: false,
    responseStream: false,
    requestType: membership_pb.GetMembershipByUserIdRequest,
    responseType: membership_pb.MembershipResponse,
    requestSerialize:
      serialize_ita_membershipservice_GetMembershipByUserIdRequest,
    requestDeserialize:
      deserialize_ita_membershipservice_GetMembershipByUserIdRequest,
    responseSerialize: serialize_ita_membershipservice_MembershipResponse,
    responseDeserialize: deserialize_ita_membershipservice_MembershipResponse,
  },
});

exports.MembershipServiceClient = grpc.makeGenericClientConstructor(
  MembershipServiceService
);
