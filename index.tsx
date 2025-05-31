// pages/index.tsx
import Head from 'next/head';
import { useEffect, useState } from 'react';

const videos = [
  {
    id: 'video1',
    title: '2025.04.03_L&Z',
    url: 'https://oss.883602.xyz/2025.04.03_L%26Z.mp4',
    label: '2025.04.03_L&Z_预告',
  },
  {
    id: 'video2',
    title: '2025.5.7_预告_v7',
    url: 'https://oss.883602.xyz/2025.5.7_%E9%A2%84%E5%91%8A_v7.m4v',
    label: '2025.05.07_SUMMER_预告',
  },
  {
    id: 'video3',
    title: 'ZHFLIM_调色展示_卫',
    url: 'https://oss.883602.xyz/ZHFLIM_%E8%B0%83%E8%89%B2%E5%B1%95%E7%A4%BA_%E5%8D%AB.m4v',
    label: '卫_调色展示',
  },
];

export default function Home() {
  const [blobUrls, setBlobUrls] = useState({});

  useEffect(() => {
    videos.forEach(async (video) => {
      try {
        const res = await fetch(video.url, { cache: 'force-cache', mode: 'cors' });
        const blob = await res.blob();
        const blobUrl = URL.createObjectURL(blob);
        setBlobUrls(prev => ({ ...prev, [video.id]: blobUrl }));
      } catch (err) {
        console.error('Fetch failed for', video.url, err);
      }
    });
  }, []);

  return (
    <>
      <Head>
        <title>ZHFLIM Videos</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <script src="https://cdn.tailwindcss.com"></script>
      </Head>
      <main className="bg-gray-100 min-h-screen p-8 text-gray-900">
        <h1 className="text-2xl font-bold mb-6">ZHFLIM 视频缓存播放测试</h1>
        <div className="space-y-8">
          {
            videos.map((v) => (
              <div key={v.id}>
                <p className="mb-2 font-semibold">{v.title}</p>
                <div className="relative">
                  <div className="absolute top-2 left-2 text-white bg-black bg-opacity-50 rounded px-2 text-sm">
                    {v.label}
                  </div>
                  <video
                    id={v.id}
                    controls
                    className="w-full max-w-3xl bg-black rounded shadow aspect-video"
                    src={blobUrls[v.id] || ''}
                  />
                </div>
              </div>
            ))
          }
        </div>
      </main>
    </>
  );
}