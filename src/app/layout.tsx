import './globals.css';  // Importa os estilos globais

export const metadata = {
  title: 'Sistema de Mensagens do Telegram',
  description: 'Aplicativo para espelhamento de mensagens do Telegram em tempo real',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>
        <header>
          <nav>
            {/* Menu de navegação ou elementos que se repetem */}
            <h1>Minha Aplicação</h1>
          </nav>
        </header>
        <main>{children}</main> {/* Renderiza o conteúdo da página */}
        <footer>
          <p>© 2024 Minha Aplicação - Todos os direitos reservados</p>
        </footer>
      </body>
    </html>
  );
}
