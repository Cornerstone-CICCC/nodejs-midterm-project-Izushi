import { NextRequest, NextResponse } from 'next/server';
import notion from '../../../libs/notion/notionAPI';

export async function GET(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url);
  const pageId = searchParams.get('pageId');

  if (!pageId || typeof pageId !== 'string') {
    return NextResponse.json({ error: 'Invalid page ID' }, { status: 400 });
  }

  try {
    const response = await notion.pages.retrieve({ page_id: pageId });
    const pageInfo = response.properties;

    const title = pageInfo.Title.title[0]?.plain_text;
    const date = pageInfo.Date.date.start;
    const author = pageInfo.Author.people[0]?.name;

    return NextResponse.json({ title, date, author });
  } catch (error) {
    console.error('Error fetching page info:', error);
    return NextResponse.json({ error: 'Failed to fetch page info' }, { status: 500 });
  }
}