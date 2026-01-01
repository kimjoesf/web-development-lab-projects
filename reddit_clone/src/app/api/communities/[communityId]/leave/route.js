
export async function DELETE(_, { params }) {
  const user = await getCurrentUser();
  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { communityId } = params;

  await CommunityMember.findOneAndDelete({
    communityId,
    userId: user._id,
  });

  await Community.findByIdAndUpdate(communityId, {
    $inc: { membersCount: -1 },
  });

  return NextResponse.json({ success: true });
}
