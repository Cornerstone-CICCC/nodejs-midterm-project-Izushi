import { NextResponse } from 'next/server';
import notion from '../../../libs/notion/notionAPI';

export async function GET() {
  try {
    const response = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID as string
    });

    const news = response.results.map((result) => {
      return {
        id: result.id,
        title: result.properties.Title.title[0].text.content,
        author: result.properties.Author.people[0].name,
        date: result.properties.Date.date.start,
        description: result.properties.Description.rich_text[0].text.content,
        tags: result.properties.Tags.multi_select.map((tag: any) => tag.name),
      };
    });

    return NextResponse.json(news);
  } catch (error) {
    console.error('', error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}