'use server'

// import { getCloudflareContext } from '@opennextjs/cloudflare' // Removed for Vercel deployment
import { headers } from 'next/headers'

// 增加计数并记录访问
export async function incrementAndLog() {
  // const cf = await getCloudflareContext() // Removed for Vercel deployment
  const headersList = await headers()

  /* // Removed DB logic for Vercel deployment
  const { results: countResults } = await cf.env.DB.prepare(
    'INSERT INTO counters (name, value) VALUES (?, 1) ON CONFLICT (name) DO UPDATE SET value = value + 1 RETURNING value'
  )
    .bind('page_views')
    .all()

  await cf.env.DB.prepare('INSERT INTO access_logs (ip, path, accessed_at) VALUES (?, ?, datetime())')
    .bind(
      headersList.get('x-forwarded-for') || headersList.get('x-real-ip') || 'unknown',
      headersList.get('x-forwarded-host') || '/'
    )
    .run()

  const { results: logs } = await cf.env.DB.prepare('SELECT * FROM access_logs ORDER BY accessed_at DESC LIMIT 5').all()
  */

  // Placeholder return value for Vercel
  const placeholderCount = 0;
  const placeholderLogs = [
      { accessed_at: new Date().toISOString() },
      { accessed_at: new Date().toISOString() }
  ];


  return {
    // count: countResults[0].value, // Original
    // recentAccess: logs // Original
    count: placeholderCount, // Placeholder
    recentAccess: placeholderLogs // Placeholder
  } as { count: number; recentAccess: { accessed_at: string }[] }
}

// 获取当前计数和最近访问
export async function getStats() {
  // const cf = await getCloudflareContext() // Removed for Vercel deployment

  /* // Removed DB logic for Vercel deployment
  const { results: count } = await cf.env.DB.prepare('SELECT value FROM counters WHERE name = ?')
    .bind('page_views')
    .all()

  const { results: logs } = await cf.env.DB.prepare(
    'SELECT accessed_at FROM access_logs ORDER BY accessed_at DESC LIMIT 5'
  ).all()
  */

  // Placeholder return value for Vercel
  const placeholderCount = 0;
  const placeholderLogs = [
      { accessed_at: new Date().toISOString() },
      { accessed_at: new Date().toISOString() }
  ];

  return {
    // count: count[0]?.value || 0, // Original
    // recentAccess: logs // Original
    count: placeholderCount, // Placeholder
    recentAccess: placeholderLogs // Placeholder
  } as { count: number; recentAccess: { accessed_at: string }[] }
}