'use client'
import React, { useState } from 'react';

export default function Home() {
  const [query, setQuery] = useState('');
  const [posts, setPosts] = useState<{ role: string; text: string; timestamp: string }[]>([]); // Usaremos "posts" em vez de "conversation"

  const [loading, setLoading] = useState(false);

  async function createIndexAndEmbeddings() {
    try {
      const result = await fetch('/api/setup', {
        method: "POST"
      });
      const json = await result.json();
      console.log('result: ', json);
    } catch (err) {
      console.log('err:', err);
    }
  }

  async function sendQuery() {
    if (!query) return;

    setLoading(true);

    try {
      // Simulando uma pergunta e uma resposta da IA
      const userQuestion = query;
      const aiResponse = 'RESPOSTA SIMULADA PARA FINS DE TESTE';
      const timestamp = new Date().toLocaleString(); // Obtém a data e hora atual

      // Criar um novo "post" com a pergunta do usuário, resposta da IA e timestamp
      const newPost = { role: 'user', text: userQuestion, timestamp };
      const newResponse = { role: 'ai', text: aiResponse, timestamp };

      // Atualizar a lista de "posts" adicionando os novos "posts"
      setPosts((prevPosts) => [...prevPosts, newPost, newResponse]);

      // Limpar o campo de entrada de texto após enviar a pergunta
      setQuery('');

      setLoading(false);
    } catch (err) {
      console.log('err:', err);
      setLoading(false);
    }
  }

  return (
    <main className="flex flex-col items-center justify-between p-24">
      <h2>IA DO JHONY</h2>
      
      {/* Renderizar os "posts" como mensagens */}
      <div className="posts">
        {posts.map((post, index) => (
          <div key={index} className={`post ${post.role === 'user' ? 'user-post' : 'ai-post'}`}>
            <p>{post.text}</p>
            <small className="timestamp">{post.timestamp}</small>
          </div>
        ))}
      </div>

      {/* Campo de entrada de texto e botão */}
      <div className="input-container">
        <input className='text-black px-2 py-1' onChange={e => setQuery(e.target.value)} value={query} placeholder="Digite sua pergunta..." />
        <button className="px-7 py-1 rounded-2xl bg-white text-black mt-2 mb-2" onClick={sendQuery}>Publicar</button>
      </div>

      {loading && <p>Enviando pergunta...</p>}
      
      {/* Botão para atualizar o cérebro da IA */}
      <br /><br />
      <button onClick={createIndexAndEmbeddings}>Atualizar o cérebro da IA conforme os dados na pasta documents</button>
    </main>
  )
}
