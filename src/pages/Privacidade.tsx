export default function Privacidade() {
  return (
    <>
      <title>Política de Privacidade | Taysil</title>
      <meta name="description" content="Política de privacidade da Taysil — como tratamos os seus dados e os seus direitos ao abrigo do RGPD." />

      <div className="pt-32 pb-20 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Política de Privacidade</h1>
        <p className="text-sm text-slate-400 mb-10">Última atualização: junho de 2025</p>

        <div className="prose prose-slate max-w-none space-y-8 text-slate-600 leading-relaxed">

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-3">1. Quem somos</h2>
            <p>
              A <strong>Taysil</strong> é uma empresa de comércio por grosso de produtos para o setor automóvel,
              com sede na Rua Vasco da Gama nº33, Algueirão Mem-Martins, 2725-152 Sintra, Portugal.
              Para questões relacionadas com privacidade, pode contactar-nos através do email{' '}
              <a href="mailto:geral.taysil@gmail.com" className="text-red-600 hover:text-red-700">
                geral.taysil@gmail.com
              </a>.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-3">2. Dados recolhidos</h2>
            <p>
              Este website não recolhe dados pessoais diretamente. Não existem formulários de registo,
              contas de utilizador nem sistemas de análise de tráfego com identificação pessoal.
            </p>
            <p className="mt-3">
              Contudo, este website utiliza serviços de terceiros que podem recolher dados técnicos:
            </p>
            <ul className="mt-3 space-y-2 list-disc list-inside">
              <li>
                <strong>Google Maps</strong> — utilizado para mostrar a localização da nossa loja.
                O Google pode recolher o seu endereço IP e outros dados técnicos ao carregar o mapa.
                Consulte a{' '}
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-red-600 hover:text-red-700"
                >
                  Política de Privacidade do Google
                </a>.
              </li>
              <li>
                <strong>Google Fonts</strong> — utilizado para carregar tipografia. O Google pode
                registar o pedido ao seu servidor (endereço IP, browser). Consulte a{' '}
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-red-600 hover:text-red-700"
                >
                  Política de Privacidade do Google
                </a>.
              </li>
              <li>
                <strong>Vercel</strong> — plataforma de alojamento do website. Pode registar
                endereços IP e dados de acesso para fins de segurança e desempenho. Consulte a{' '}
                <a
                  href="https://vercel.com/legal/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-red-600 hover:text-red-700"
                >
                  Política de Privacidade da Vercel
                </a>.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-3">3. Cookies</h2>
            <p>
              Este website utiliza cookies técnicos necessários ao funcionamento do serviço Google Maps.
              Ao aceitar os cookies, autoriza o carregamento do mapa interativo. Pode recusar, sendo
              apresentada uma alternativa estática.
            </p>
            <p className="mt-3">
              A sua preferência é guardada localmente no seu browser (localStorage) e não é transmitida
              a nenhum servidor da Taysil.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-3">4. Base legal (RGPD)</h2>
            <p>
              O tratamento de dados realizado por serviços de terceiros (Google, Vercel) baseia-se no
              seu consentimento (Artigo 6.º, n.º 1, alínea a) do RGPD) e no interesse legítimo de
              garantir a segurança e o desempenho do website.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-3">5. Os seus direitos</h2>
            <p>Ao abrigo do RGPD, tem direito a:</p>
            <ul className="mt-3 space-y-1 list-disc list-inside">
              <li>Aceder aos seus dados pessoais</li>
              <li>Solicitar a retificação ou eliminação</li>
              <li>Opor-se ao tratamento</li>
              <li>Apresentar reclamação à <a href="https://www.cnpd.pt" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:text-red-700">CNPD</a> (Comissão Nacional de Proteção de Dados)</li>
            </ul>
            <p className="mt-3">
              Para exercer estes direitos, contacte-nos em{' '}
              <a href="mailto:geral.taysil@gmail.com" className="text-red-600 hover:text-red-700">
                geral.taysil@gmail.com
              </a>.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-3">6. Alterações a esta política</h2>
            <p>
              Podemos atualizar esta política ocasionalmente. A data de última atualização estará sempre
              indicada no topo desta página.
            </p>
          </section>

        </div>
      </div>
    </>
  )
}
