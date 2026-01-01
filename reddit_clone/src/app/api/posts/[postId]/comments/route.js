import Comment from "@/archive/models/Comment";
import Post from "@/archive/models/Post";

export async function POST(req, { params }) {
  const user = await getCurrentUser();
  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { content, media } = await req.json();
  const { postId } = params;

  if (!content && (!media || media.length === 0))
    return NextResponse.json(
      { error: "Comment must have text or image" },
      { status: 400 }
    );

  const comment = await Comment.create({
    postId,
    authorId: user._id,
    content,
    media: media || [],
  });

  await Post.findByIdAndUpdate(postId, {
    $inc: { commentsCount: 1 },
  });

  return NextResponse.json(comment, { status: 201 });
}
