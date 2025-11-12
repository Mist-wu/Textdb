"use client";

import { useState } from "react";

export default function Home() {
  const [key, setKey] = useState("123456");
  const [textData, setTextData] = useState("");
  const [langOpen, setLangOpen] = useState(false);

  // 生成随机key
  const generateRandomKey = () => {
    const chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_";
    let result = "";
    for (let i = 0; i < 20; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setKey(result);
  };

  // 读取数据
  const readData = async () => {
    try {
      const response = await fetch(`https://textdb.online/${key}`);
      const data = await response.text();
      setTextData(data);
    } catch (error) {
      alert("读取失败");
    }
  };

  // 更新数据
  const updateData = async () => {
    try {
      const response = await fetch(
        `https://textdb.online/update/?key=${key}&value=${encodeURIComponent(textData)}`
      );
      const result = await response.json();
      if (result.status === 1) {
        alert("更新成功");
      }
    } catch (error) {
      alert("更新失败");
    }
  };

  // 删除数据
  const deleteData = async () => {
    try {
      const response = await fetch(
        `https://textdb.online/update/?key=${key}&value=`
      );
      const result = await response.json();
      if (result.status === 1) {
        alert("删除成功");
        setTextData("");
      }
    } catch (error) {
      alert("删除失败");
    }
  };

  // 复制链接
  const copyLink = () => {
    const url = `https://textdb.online/${key}`;
    navigator.clipboard.writeText(url);
    alert("链接已复制");
  };

  // 重置
  const reset = () => {
    setKey("");
    setTextData("");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-[#1d83df] to-[#2e9beb] text-white py-4 shadow-md">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div className="text-2xl font-bold">
            TextDB<span className="text-orange-400">.online</span>
          </div>
          <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-2 px-4 py-2 rounded hover:bg-white/10 transition"
            >
              🌐 中文-简体
            </button>
            {langOpen && (
              <div className="absolute right-0 mt-2 bg-white text-gray-800 rounded shadow-lg py-2 w-48 max-h-96 overflow-y-auto z-10">
                <a href="?lang=en" className="block px-4 py-2 hover:bg-gray-100">English</a>
                <a href="?lang=zh-cn" className="block px-4 py-2 hover:bg-gray-100 bg-gray-200">中文-简体</a>
                <a href="?lang=zh-tw" className="block px-4 py-2 hover:bg-gray-100">中文-繁體</a>
                <a href="?lang=ja" className="block px-4 py-2 hover:bg-gray-100">日本語</a>
                <a href="?lang=ko" className="block px-4 py-2 hover:bg-gray-100">한국어</a>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#1d83df] to-[#2e9beb] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">在线文本数据库</h1>
          <p className="text-lg md:text-xl opacity-90">
            一个API轻松存储和更新您的文本数据，支持GET和POST方法
          </p>
        </div>
      </section>

      {/* Main Tool Section */}
      <section className="max-w-7xl mx-auto px-4 -mt-8">
        <div className="bg-white rounded-lg shadow-xl p-6 md:p-8">
          {/* URL Input */}
          <div className="flex flex-col md:flex-row gap-0 mb-4">
            <div className="flex-1 flex items-stretch border border-gray-300 rounded-md overflow-hidden">
              <span className="px-4 py-3 bg-gray-200 text-gray-700 font-medium whitespace-nowrap border-r border-gray-300 flex items-center">
                https://textdb.online
              </span>
              <input
                type="text"
                value={key}
                onChange={(e) => setKey(e.target.value)}
                className="flex-1 px-4 py-3 bg-white focus:outline-none text-gray-700"
                placeholder="123456"
              />
              <button
                onClick={generateRandomKey}
                className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium transition border-l border-gray-300"
              >
                随机生成
              </button>
            </div>
          </div>

          {/* Text Area */}
          <textarea
            value={textData}
            onChange={(e) => setTextData(e.target.value)}
            className="w-full h-64 p-4 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 mb-6"
            placeholder="输入或粘贴文本数据到此处..."
          />

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={readData}
              className="px-6 py-3 bg-[#33B1F6] hover:bg-[#2897d8] text-white font-medium rounded-md transition shadow-sm"
            >
              读取数据
            </button>
            <button
              onClick={updateData}
              className="px-6 py-3 bg-[#32CCE8] hover:bg-[#28b3ca] text-white font-medium rounded-md transition shadow-sm"
            >
              更新数据
            </button>
            <button
              onClick={deleteData}
              className="px-6 py-3 bg-[#F5C15F] hover:bg-[#d9a947] text-white font-medium rounded-md transition shadow-sm"
            >
              删除数据
            </button>
            <button
              onClick={copyLink}
              className="px-6 py-3 bg-[#54C4C2] hover:bg-[#42a8a6] text-white font-medium rounded-md transition shadow-sm"
            >
              复制链接
            </button>
            <button
              onClick={reset}
              className="px-6 py-3 bg-[#CCCCCC] hover:bg-[#B8B8B8] text-white font-medium rounded-md transition shadow-sm"
            >
              重置
            </button>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        {/* What is TextDB */}
        <div className="bg-white rounded-lg shadow p-6 md:p-8 mb-6">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">什么是文本数据库？</h2>
          <div className="text-gray-700 space-y-4 leading-relaxed">
            <p>
              在线文本数据库（TextDB.online）是一个免费的文本数据存储和共享服务平台。用户可以通过简单的API接口存储、更新和删除文本数据。存储的文本数据可以随时下载和检索。
            </p>
            <p>
              将数据以 application/x-www-form-urlencoded 格式发送至 textdb.online/update 即可完成文本数据的创建、更新和删除操作，支持 GET 和 POST 方法请求。
            </p>
            <p>详细请求信息，请参考以下API文档。</p>
          </div>
        </div>

        {/* Usage Notice */}
        <div className="bg-white rounded-lg shadow p-6 md:p-8 mb-6">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">使用须知</h2>
          <div className="text-gray-700 space-y-4 leading-relaxed">
            <p>
              本服务为免费开放，旨在方便用户进行测试和学习使用。但由于其开放性，可能会受到恶意请求或攻击，导致服务不稳定甚至中断。
            </p>
            <p>
              因此，我们建议用户仅在测试或非生产环境中使用该服务。如需将其应用于生产环境，建议使用更稳定可靠的离线版本。
            </p>
            <p>
              我们提供售价为 300 元的离线版本，支持私有化部署。该版本本运行速度更快，稳定性更高，适用于正式项目或内部系统使用。
            </p>
            <p>
              您可以通过{" "}
              <a
                href="https://demo.textdb.online"
                target="_blank"
                className="text-blue-600 hover:underline"
                rel="noreferrer"
              >
                demo.textdb.online
              </a>{" "}
              在线体验离线版本的效果。部署方式也非常简单，仅需一个文件即可完成安装和运行。
            </p>
          </div>
        </div>

        {/* API Documentation */}
        <div className="bg-white rounded-lg shadow p-6 md:p-8 mb-6">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">API文档</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <tbody>
                <tr className="border-b border-gray-300">
                  <td className="p-4 bg-gray-50 font-semibold w-32 align-top border-r border-gray-300">API URL</td>
                  <td className="p-4 align-top">https://textdb.online/update/</td>
                </tr>
                <tr className="border-b border-gray-300">
                  <td className="p-4 bg-gray-50 font-semibold align-top border-r border-gray-300">请求方法</td>
                  <td className="p-4 align-top">GET / POST</td>
                </tr>
                <tr className="border-b border-gray-300">
                  <td className="p-4 bg-gray-50 font-semibold align-top border-r border-gray-300">数据编码</td>
                  <td className="p-4 align-top">application/x-www-form-urlencoded</td>
                </tr>
                <tr className="border-b border-gray-300">
                  <td className="p-4 bg-gray-50 font-semibold align-top border-r border-gray-300">请求参数</td>
                  <td className="p-4 align-top">
                    <div className="space-y-3">
                      <p>
                        <strong>key</strong>: 文本标识，长度为6-60位字符，仅支持以下字符：0-9a-zA-Z-_。
                      </p>
                      <p>
                        <strong>value</strong>: 文本数据，20万字符以下任意文本，value为空则表示删除记录。
                      </p>
                      <p className="text-red-700">
                        由于没有密码鉴权保护，建议使用随机生成20位及以上的key，降低碰撞概率，减少业务风险。
                      </p>
                    </div>
                  </td>
                </tr>
                <tr className="border-b border-gray-300">
                  <td className="p-4 bg-gray-50 font-semibold align-top border-r border-gray-300">请求示例</td>
                  <td className="p-4 align-top">
                    <div className="space-y-3">
                      <p>
                        【创建/更新】
                        <a
                          href="https://textdb.online/update/?key=123456&value=hello-world"
                          target="_blank"
                          className="text-blue-600 hover:underline break-all"
                          rel="noreferrer"
                        >
                          https://textdb.online/update/?key=123456&value=hello-world
                        </a>
                      </p>
                      <p>
                        【删除】
                        <a
                          href="https://textdb.online/update/?key=123456&value="
                          target="_blank"
                          className="text-blue-600 hover:underline break-all"
                          rel="noreferrer"
                        >
                          https://textdb.online/update/?key=123456&value=
                        </a>
                      </p>
                      <p>
                        【读取】
                        <a
                          href="https://textdb.online/123456"
                          target="_blank"
                          className="text-blue-600 hover:underline break-all"
                          rel="noreferrer"
                        >
                          https://textdb.online/123456
                        </a>
                      </p>
                      <p className="text-sm text-gray-600">
                        若使用GET方式更新数据，请先进行URLEncode编码处理，建议优先使用POST方法请求。
                      </p>
                    </div>
                  </td>
                </tr>
                <tr className="border-b border-gray-300">
                  <td className="p-4 bg-gray-50 font-semibold align-top border-r border-gray-300">响应参数</td>
                  <td className="p-4 align-top">
                    <div className="space-y-2">
                      <p>
                        <strong>status</strong>: 请求处理结果，1为成功，0为失败。
                      </p>
                      <p>
                        <strong>data.key</strong>: 自定义的文本标识。
                      </p>
                      <p>
                        <strong>data.url</strong>: 文本记录的URL，可以通过该URL读取文本数据。
                      </p>
                      <p>
                        <strong>req_id</strong>: API请求ID。
                      </p>
                    </div>
                  </td>
                </tr>
                <tr className="border-b border-gray-300">
                  <td className="p-4 bg-gray-50 font-semibold align-top border-r border-gray-300">响应示例</td>
                  <td className="p-4 align-top">
                    <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm font-mono border border-gray-300">
{`{
  "status": 1,
  "data": {
    "key": "123456",
    "url": "https://textdb.online/123456"
  },
  "req_id": "131690600e2b79b47108"
}`}
                    </pre>
                  </td>
                </tr>
                <tr className="border-b border-gray-300">
                  <td className="p-4 bg-gray-50 font-semibold align-top border-r border-gray-300">请求限制</td>
                  <td className="p-4 align-top">
                    读取次数不受限制，每个IP每日的创建、更新和删除操作总和限制为500次。
                  </td>
                </tr>
                <tr className="border-b border-gray-300">
                  <td className="p-4 bg-gray-50 font-semibold align-top border-r border-gray-300">注意事项</td>
                  <td className="p-4 align-top">
                    <div className="space-y-2">
                      <p>
                        1. 文本记录会在没有更新操作1年后自动删除，建议使用完毕后主动删除。
                      </p>
                      <p>
                        2. 文本数据没有访问密码保护，建议设置至少20位的key长度，或添加专属前缀，以避免因key碰撞而导致的业务风险。
                      </p>
                      <p>3. 数据创建或更新速度较慢，请避免频繁操作。</p>
                      <p>4. 严禁存储非法数据或将平台用于非法用途！</p>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-8 text-gray-700 space-y-4 leading-relaxed">
            <p>如果文本记录不存在，则会自动创建；如果记录已存在，则会更新该记录。</p>
            <p>
              创建或更新后，文本记录可以通过 https://textdb.online/[key名称] 读取，默认支持跨域请求，content-type 为 text/plain。
            </p>
            <p>读取文本记录时，将始终返回200 HTTP状态码，如果文本记录不存在则响应内容为空。</p>
            <p>
              TextDB.online服务搭建在Cloudflare网络上，可能会存在缓存。在创建、更新和删除文本数据时，会自动刷新缓存，因此操作可能较为耗时。请尽量减少创建和更新频率，以读取为主。
            </p>
            <p>
              私有部署版本无需经过 CDN 中转，响应速度将更快、更高效，同时也进一步提升了数据处理的稳定性与安全性，适合对性能和可靠性要求较高的生产环境使用。
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-300">
            Copyright © 2025 <span className="hover:underline cursor-pointer">TextDB.online</span> All Rights Reserved
          </p>
        </div>
      </footer>
    </div>
  );
}
