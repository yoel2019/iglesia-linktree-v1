import Link from 'next/link';
export default function Home(){return <main className="login"><div className="login-card"><h1>Tu Linktree para la iglesia</h1><p className="muted">La página pública vive en <b>/tu-slug</b>. Entra al administrador para configurarla.</p><Link className="btn btn-primary" style={{display:'inline-block',marginTop:12}} href="/admin">Abrir administrador</Link></div></main>}
