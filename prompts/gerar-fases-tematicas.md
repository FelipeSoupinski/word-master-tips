    Você é um Game Designer Especialista e o "Mestre Supremo" do jogo Dica de Mestre (estilo Codenames).   
    Sua missão é gerar um arquivo JSON completo contendo 20 fases pré-computadas para o jogo.              
                                                                                                           
    Cada uma das 20 fases deverá ser focada em uma temática única baseada em uma Disciplina do Conhecimento
  Humano (ex: Filosofia, Sociologia, História, Matemática, Física, Biologia, Português, Geografia, Artes,  
  Química, etc. - defina 20 diferentes).                                                                   
                                                                                                           
    Siga rigorosamente o processo em 2 etapas abaixo para CADA uma das 20 fases:                           
                                                                                                           
    === ETAPA 1: SELEÇÃO ESTRATÉGICA DAS 25 PALAVRAS ===                                                   
    Para a disciplina escolhida da fase, você deve selecionar exatamente 25 palavras relacionadas a ela.   
    - O SEGREDO DO GAME DESIGN: Não escolha 25 palavras aleatórias. Escolha essas palavras "de trás pra    
  frente", já pensando em como elas vão se agrupar.                                                        
    - Você deve garantir que dentro dessas 25 palavras existam sub-grupos perfeitos (clusters) de 3, 4 ou 5
  palavras que tenham uma conexão semântica fortíssima e super divertida, e algumas palavras "diferentonas"
  de propósito para dificultar.                                                                            
                                                                                                           
    === ETAPA 2: O ALGORITMO "TOP-DOWN GREEDY SEARCH" ===                                                  
    Após definir as 25 palavras da fase, atue como a IA do nosso jogo e gere as dicas seguindo a nossa     
  regra de Busca Gulosa Descendente:                                                                       
    1. Comece buscando as conexões brilhantes de N=5 ou N=4 cartas. Quando encontrar a dica perfeita para  
  essas cartas, REMOVA elas da mesa.                                                                       
    2. Desça para N=3 e N=2 procurando as próximas melhores conexões e removendo da mesa.                  
    3. Tratamento de Outliers (N=1): As cartas que sobrarem no final devem receber dicas de N=1, mas devem 
  ser obrigatoriamente um SINÔNIMO FORTE ou ASSOCIAÇÃO DIRETA. NUNCA use palavras genéricas como "Coisa",  
  "Assunto", "Aleatório".                                                                                  
    4. REGRA DE OURO (Validação de Colisão): A dica que você criar DEVE se aplicar EXCLUSIVAMENTE àquelas N
  cartas escolhidas. Exemplo: se você criar a dica "ANIMAL x4", certifique-se de que não exista um "RATO"  
  esquecido nas cartas restantes da mesa. Se houver, a dica deveria ter sido "ANIMAL x5". O jogador tem    
  vidas e uma colisão não quebra o jogo, mas você deve ser um mestre perfeito e evitar isso.               
    5. REGRA DE PRATA: A palavra usada como Dica (Hint) NUNCA pode ser uma das 25 palavras que estão na    
  mesa.                                                                                                    
                                                                                                           
    === FORMATO DE SAÍDA ===                                                                               
    Responda APENAS com um único bloco de código contendo o JSON válido e completo para as 20 fases. Não   
  adicione textos explicativos antes ou depois do JSON. Não resuma e não trunque o arquivo (escreva as 20  
  fases completas).                                                                                        
                                                                                                           
    O schema do JSON deve ser exatamente este (você pode incluir o nome da disciplina no id para contexto  
  se quiser, mas a estrutura raiz é um array):                                                             
                                                                                                           
    [                                                                                                      
      {                                                                                                    
        "id": 1,                                                                                           
        "subject": "Física",                                                                               
        "words": [                                                                                         
          "GRAVIDADE", "MASSA", "ACELERAÇÃO", "LUZ", "ESPAÇO",                                             
          ... (exatamente 25 palavras em MAIÚSCULAS)                                                       
        ],                                                                                                 
        "hints": [                                                                                         
          {                                                                                                
            "hint": "NEWTON",                                                                              
            "targets": ["GRAVIDADE", "MASSA", "ACELERAÇÃO"]                                                
          },                                                                                               
          {                                                                                                
            "hint": "ESCURIDÃO",                                                                           
            "targets": ["LUZ", "ESPAÇO"]                                                                   
          }                                                                                                
          ... (quantas dicas forem necessárias para cobrir TODAS as 25 palavras sem repeti-las)            
        ]                                                                                                  
      },                                                                                                   
      {                                                                                                    
        "id": 2,                                                                                           
        "subject": "História",                                                                             
        ...                                                                                                
      }                                                                                                    
    ]