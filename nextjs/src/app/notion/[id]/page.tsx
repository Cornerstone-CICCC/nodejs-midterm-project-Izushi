'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useParams, useRouter } from 'next/navigation';
import { EditIcon, Trash2Icon } from 'lucide-react';
import Header from '@/app/components/header';

export default function Page() {
  const params = useParams();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [editCommentId, setEditCommentId] = useState<string | null>(null);
  const [editCommentContent, setEditCommentContent] = useState("");
  const [pageContents, setPageContents] = useState([]);
  const [pageInfo, setPageInfo] = useState({ title: "", date: "", author: "" });
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    checkAuth();
    fetchPageData();
    fetchComments();
  }, []);

  const checkAuth = async () => {
    try {
      const res = await fetch('http://localhost:3500/users/check-auth', {
        credentials: 'include',
      });

      if (!res.ok) {
        throw new Error('Not authenticated');
      }

      const userData = await res.json();
      setUser(userData);
    } catch (error) {
      router.push('/login');
    }
  };

  const fetchPageData = async () => {
    try {
      const resContent = await fetch(`/api/getPageContent?pageId=${params.id}`);
      const contents = await resContent.json();
      setPageContents(contents);

      const resInfo = await fetch(`/api/getPageInfo?pageId=${params.id}`);
      const info = await resInfo.json();
      setPageInfo(info);
    } catch (error: any) {
      setError(error.message);
    }
  };

  const fetchComments = async () => {
    try {
      const res = await fetch(`http://localhost:3500/comments/${params.id}`);
      const data = await res.json();
      setComments(data);
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleCommentSubmit = async () => {
    const res = await fetch(`http://localhost:3500/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ postId: params.id, username: user.username, content: newComment }),
    });
    const data = await res.json();
    setComments([...comments, data]);
    setNewComment('');
  };

  const handleCommentDelete = async (commentId: string) => {
    await fetch(`http://localhost:3500/comments/${commentId}`, {
      method: 'DELETE',
    });
    setComments(comments.filter(comment => comment.id !== commentId));
  };

  const handleCommentEdit = async (commentId: string) => {
    await fetch(`http://localhost:3500/comments/${commentId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content: editCommentContent }),
    });
    setEditCommentId(null);
    fetchComments();
  };

  const handleLogout = async () => {
    try {
      const res = await fetch('http://localhost:3500/users/logout', {
        method: 'GET',
        credentials: 'include',
      });

      if (!res.ok) {
        throw new Error('Logout failed');
      }

      router.push('/login');
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <>
      <Header user={user} onLogout={handleLogout} />
      <div className="container mx-auto p-20">
        <div className="flex items-center justify-between mb-6">
          <div className="ml-5 lg:ml-20 flex items-center px-4 py-2 text-sm hover:bg-gray-50">
            <Link href="/notion/list" className="text-blue-500">← Back</Link>
          </div>
        </div>
        <div className="text-center px-5 lg:px-20 font-bold text-3xl">
          <p>{pageInfo.title}</p>
        </div>
        <div className="mt-2 text-right px-5 lg:px-20 text-gray-500">
          <p>{pageInfo.date}</p>
        </div>
        <div className="text-right px-5 lg:px-20 text-gray-500">
          <p>{pageInfo.author}</p>
        </div>
        {error && (
          <p className="text-red-500 text-sm mb-4">{error}</p>
        )}
        <div className="py-10 px-5 lg:p-10 lg:px-20">
          {pageContents.map((content:any, index:any) => {
            const formattedMarkdown = content.parent
            return (
              <div className="pt-3 list-decimal prose" key={index}>
                <ReactMarkdown
                  components={{
                    ol: ({node, ...props}) => <ol className="list-decimal list-inside pb-2" {...props} />,
                    li: ({node, ...props}) => <li {...props} />,
                    h1: ({ node, ...props }) => <h1 className="text-3xl font-bold" {...props} />,
                    h2: ({ node, ...props }) => <h2 className="text-2xl font-bold" {...props} />,
                    h3: ({ node, ...props }) => <h3 className="text-xl font-bold" {...props} />,
                    h4: ({ node, ...props }) => <h4 className="text-lg font-bold" {...props} />,
                    h5: ({ node, ...props }) => <h5 className="text-base font-bold" {...props} />,
                    h6: ({ node, ...props }) => <h6 className="text-sm font-bold" {...props} />,
                    p: ({ node, ...props }) => <p className="text-gray-700" {...props} />,
                    strong: ({ node, ...props }) => <strong className="font-bold" {...props} />,
                    code({ node, inline, className, children, ...props }) {
                      const match = /language-(\w+)/.exec(className || "");
                      return inline ? (
                        <code className="bg-gray-200 text-red-500 px-1 rounded" {...props}>
                          {children}
                        </code>
                      ) : match ? (
                        <SyntaxHighlighter style={oneDark} language={match[1]} PreTag="div" {...props}>
                          {String(children).replace(/\n$/, "")}
                        </SyntaxHighlighter>
                      ) : (
                        <code className="bg-gray-200 p-1 rounded" {...props}>
                          {children}
                        </code>
                      );
                    },
                  }}
                >
                  {formattedMarkdown}
                </ReactMarkdown>
              </div>
            )
          })}
        </div>
        <div className="py-10 px-5 lg:p-10 lg:px-20">
          <h2 className="text-2xl font-bold mb-4">Comments</h2>
          {comments.map(comment => (
            <div key={comment.id} className="mb-4 p-4 border border-gray-300 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <p className="text-lg font-bold">{comment.username}</p>
              </div>
              {editCommentId === comment.id ? (
                <div>
                  <textarea
                    value={editCommentContent}
                    onChange={(e) => setEditCommentContent(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                    rows="4"
                  />
                  <div className="flex justify-end">
                    <button
                      onClick={() => handleCommentEdit(comment.id)}
                      className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                    >
                      Save Comment
                    </button>
                  </div>
                </div>
              ) : (
                <p className="text-gray-700">{comment.content}</p>
              )}
              {user.username === comment.username ? (
                  <div className="flex justify-end">
                    <button
                      onClick={() => {
                        setEditCommentId(comment.id);
                        setEditCommentContent(comment.content);
                      }}
                      className="text-gray-500 hover:text-gray-700 mr-2"
                    >
                      <EditIcon />
                    </button>
                    <button
                      onClick={() => handleCommentDelete(comment.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2Icon />
                    </button>
                  </div>
                ) : null}
            </div>
          ))}
          <div className="mt-6">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              rows="4"
              placeholder="Input your comment..."
            />
            <div className="flex justify-end">
              <button
                onClick={handleCommentSubmit}
                className="mt-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700"
              >
                Submit Comment
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}