import Comment from "@/archive/models/Comment";

export async function GET(req) {
  await connectDB();

  const { searchParams } = new URL(req.url);
  const postId = searchParams.get("postId");

  const comments = await Comment.find({ postId })
    .sort({ score: -1 });

  return Response.json(comments);
}
