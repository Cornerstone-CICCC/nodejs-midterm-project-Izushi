// import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse, NextRequest } from 'next/server';
import notion from '../../../libs/notion/notionAPI';
import { NotionToMarkdown } from 'notion-to-md';

const n2m = new NotionToMarkdown({ notionClient: notion });

export async function GET(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url);
  const pageId = searchParams.get('pageId');

  if (!pageId || typeof pageId !== 'string') {
    return NextResponse.json({ error: 'Invalid page ID' }, { status: 400 });
  }

  try {
    const mdblocks = await n2m.pageToMarkdown(pageId, 2);
    return NextResponse.json(mdblocks);
  } catch (error) {
    console.error('Error fetching page content:', error);
    return NextResponse.json({ error: 'Failed to fetch page content' }, { status: 500 });
  }
}