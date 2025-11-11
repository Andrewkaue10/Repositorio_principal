import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Image,
  Linking,
  TouchableOpacity,
  StatusBar,
  useWindowDimensions
} from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome5, Feather } from '@expo/vector-icons';

// Tipos TypeScript
type Experiencia = {
  id: number;
  empresa: string;
  periodo: string;
  cargo: string;
  descricao: string;
  link?: string;
};

type Formacao = {
  id: number;
  curso: string;
  instituicao: string;
  periodo: string;
};

type Curso = {
  id: number;
  nome: string;
  instituicao: string;
  periodo: string;
};

type Contato = {
  icon: any;
  library: React.ComponentType<any>;
  info: string;
  link?: string;
};

export default function App() {
  const { width } = useWindowDimensions();
  const isSmallScreen = width < 375;
  const isLargeScreen = width > 768;

  // Dados do currículo
  const experiencia: Experiencia[] = [
    {
      id: 1,
      empresa: 'Ctrlfile',
      periodo: 'Jun. de 2023 - Dez. de 2023',
      cargo: 'Desenvolvimento de Projeto - PI',
      descricao: 'Site Front-end voltado para seder serviços de armazenamento em nuvem.'
    },
    {
      id: 2,
      empresa: 'Movarte',
      periodo: 'Fev. de 2025',
      cargo: 'Desenvolvimento de projeto - PI',
      descricao: 'Elaboração de front-end de um dashboard para o evento do demoday.',
      link: 'https://www.figma.com/proto/1n9sXoVh7mLZt2l3a5j8eM/Movarte---Dashboard?page-id=0%3A1&node-id=1-2&viewport=241%2C48%2C0.25&scaling=min-zoom'
        },
      {
      id: 3,
      empresa: 'Dashboard Arco-Mix',
      periodo: 'Julho de 2025',
      cargo: 'Desenvolvimento de projeto - PI',
      descricao: 'Elaboração front-end de um dashboard para o Arco-mix, Tive a honra de ser o scrum master do projeto, o projeto tinha como objetivo criar um dashboard para o Arco-mix, um evento de tecnologia e inovação. O dashboard foi desenvolvido utilizando React, TypeScript e Tailwind CSS, e foi projetado para ser responsivo e fácil de usar. O projeto foi um sucesso, e o dashboard foi utilizado durante o evento para fornecer informações em tempo real sobre as atividades, palestrantes e expositores.',
      link: 'https://www.figma.com/proto/E9fsNNGuPEPUPSxL2Yvboh/Arco-mix?node-id=648-134&starting-point-node-id=691%3A897'    
    }
  ];

  const formacao: Formacao[] = [
    {
      id: 1,
      curso: 'Análise e Desenvolvimento de Sistemas',
      instituicao: 'Faculdade Senac Pernambuco',
      periodo: 'fev de 2024 - Dez de 2026'
    },
    {
      id: 2,
      curso: 'Ensino médio + Curso Técnico',
      instituicao: 'Mediotec Senac Pernambuco',
      periodo: 'fev de 2022 - Dez de 2024'
    }
  ];

  const cursos: Curso[] = [
    {
      id: 1,
      nome: 'Minicurso de python',
      instituicao: 'DIO',
      periodo: 'Abr. de 2025'
    },
    {
      id: 2,
      nome: 'Curso de cibersegurança',
      instituicao: 'Cisco Networking Academy',
      periodo: 'Abr. de 2024 - Mai. de 2024'
    },
    {
      id: 3,
      nome: 'Curso de React',
      instituicao: 'Rocketseat',
      periodo: 'Março de 2025 - Abril de 2025'
    }
  ];

  const hardSkills: string[] = [
    'Git e GitHub', 'HTML/CSS', 'React', 'Java SpringBoot', 
    'JavaScript', 'MySql', 'Full Stack', 'Sistemas de Automação',
    'TypeScript', 'Node.js'
  ];

  const softSkills: string[] = [
    'Gestão de projetos', 'Solução de problemas', 'Trabalho em equipe',
    'Comunicação clara e objetiva', 'Colaboração em projetos',
    'Tomada de decisão', 'Mentoria de colegas júniores'
  ];

  const contatos: Contato[] = [
    {
      icon: 'phone' as const,
      library: MaterialIcons,
      info: '(81) 98811-5610',
      link: 'tel:+5581988115610'
    },
    {
      icon: 'email' as const,
      library: MaterialIcons,
      info: 'andrewkaue13@gmail.com',
      link: 'mailto:andrewkaue13@gmail.com'
    },
    {
      icon: 'location-on' as const,
      library: MaterialIcons,
      info: 'Jaboatão dos Guararapes, Pernambuco'
    },
    {
      icon: 'logo-github' as const,
      library: Ionicons,
      info: 'AndrewKaue10',
      link: 'https://github.com/AndrewKaue10'
    },
    {
      icon: 'logo-linkedin' as const,
      library: Ionicons,
      info: 'Andrew Kauê',
      link: 'https://www.linkedin.com/in/andrew-kau%C3%AA-57380b2a8/'
    }
  ];

  // Funções para lidar com cliques
  const handlePressContato = (link?: string): void => {
    if (link) {
      Linking.openURL(link);
    }
  };

  const handlePressProjeto = (link?: string): void => {
    if (link) {
      Linking.openURL(link);
    }
  };

  // Componente para renderizar experiência
  const renderExperiencia = (item: Experiencia) => (
    <View key={item.id} style={[
      styles.experienciaItem,
      isSmallScreen && styles.experienciaItemSmall
    ]}>
      <View style={styles.experienciaHeader}>
        <View style={[
          styles.experienciaIcon,
          isSmallScreen && styles.experienciaIconSmall
        ]}>
          <Feather name="briefcase" size={isSmallScreen ? 14 : 16} color="#fff" />
        </View>
        <View style={styles.experienciaInfo}>
          <Text style={[
            styles.empresa,
            isSmallScreen && styles.empresaSmall
          ]}>{item.empresa}</Text>
          <Text style={[
            styles.periodo,
            isSmallScreen && styles.periodoSmall
          ]}>{item.periodo}</Text>
        </View>
      </View>
      <Text style={[
        styles.cargo,
        isSmallScreen && styles.cargoSmall
      ]}>{item.cargo}</Text>
      <Text style={[
        styles.descricaoExperiencia,
        isSmallScreen && styles.descricaoExperienciaSmall
      ]}>{item.descricao}</Text>
      {item.link && (
        <TouchableOpacity 
          style={styles.linkContainer}
          onPress={() => handlePressProjeto(item.link)}
        >
          <Feather name="external-link" size={isSmallScreen ? 12 : 14} color="#6366f1" />
          <Text style={[
            styles.linkProjeto,
            isSmallScreen && styles.linkProjetoSmall
          ]}>Ver projeto</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  // Componente para renderizar formação
  const renderFormacao = (item: Formacao) => (
    <View key={item.id} style={[
      styles.formacaoItem,
      isSmallScreen && styles.formacaoItemSmall
    ]}>
      <View style={[
        styles.formacaoIcon,
        isSmallScreen && styles.formacaoIconSmall
      ]}>
        <Feather name="book" size={isSmallScreen ? 14 : 16} color="#6366f1" />
      </View>
      <View style={styles.formacaoContent}>
        <Text style={[
          styles.curso,
          isSmallScreen && styles.cursoSmall
        ]}>{item.curso}</Text>
        <Text style={[
          styles.instituicao,
          isSmallScreen && styles.instituicaoSmall
        ]}>{item.instituicao}</Text>
        <Text style={[
          styles.periodo,
          isSmallScreen && styles.periodoSmall
        ]}>{item.periodo}</Text>
      </View>
    </View>
  );

  // Componente para renderizar cursos
  const renderCurso = (item: Curso) => (
    <View key={item.id} style={[
      styles.cursoItem,
      isSmallScreen && styles.cursoItemSmall
    ]}>
      <View style={[
        styles.cursoIcon,
        isSmallScreen && styles.cursoIconSmall
      ]}>
        <Feather name="award" size={isSmallScreen ? 12 : 14} color="#6366f1" />
      </View>
      <View style={styles.cursoContent}>
        <Text style={[
          styles.cursoNome,
          isSmallScreen && styles.cursoNomeSmall
        ]}>{item.nome}</Text>
        <Text style={[
          styles.cursoInstituicao,
          isSmallScreen && styles.cursoInstituicaoSmall
        ]}>{item.instituicao}</Text>
        <Text style={[
          styles.cursoPeriodo,
          isSmallScreen && styles.cursoPeriodoSmall
        ]}>{item.periodo}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#6366f1" barStyle="light-content" />
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          isSmallScreen && styles.scrollContentSmall
        ]}
      >
        {/* Header com Foto e Informações Pessoais */}
        <View style={[
          styles.header,
          isSmallScreen && styles.headerSmall,
          isLargeScreen && styles.headerLarge
        ]}>
          <View style={styles.avatarContainer}>
            <Image
              source={{ uri: 'https://github.com/Andrewkaue10.png' }}
              style={[
                styles.foto,
                isSmallScreen && styles.fotoSmall,
                isLargeScreen && styles.fotoLarge
              ]}
            />
            <View style={[
              styles.verificado,
              isSmallScreen && styles.verificadoSmall
            ]}>
              <Feather name="check" size={isSmallScreen ? 12 : 14} color="#fff" />
            </View>
          </View>
          <Text style={[
            styles.nome,
            isSmallScreen && styles.nomeSmall,
            isLargeScreen && styles.nomeLarge
          ]}>Andrew Kauê</Text>
          <Text style={[
            styles.profissao,
            isSmallScreen && styles.profissaoSmall,
            isLargeScreen && styles.profissaoLarge
          ]}>Desenvolvedor Full Stack</Text>
          <Text style={[
            styles.descricaoHeader,
            isSmallScreen && styles.descricaoHeaderSmall,
            isLargeScreen && styles.descricaoHeaderLarge
          ]}>
            Desenvolvedor Front-end com experiência em aplicações web e APIs. Tenho conhecimento em Java e React,
            com foco em soluções escaláveis e alta performance. Comunicativo, colaborativo e apaixonado por aprender novas tecnologias.
          </Text>
          
          {/* Contatos rápidos no header */}
          <View style={[
            styles.contatosRapidos,
            isSmallScreen && styles.contatosRapidosSmall
          ]}>
            {contatos.slice(0, 3).map((contato, index) => {
              const IconComponent = contato.library;
              return (
                <TouchableOpacity 
                  key={index} 
                  style={[
                    styles.contatoRapido,
                    isSmallScreen && styles.contatoRapidoSmall
                  ]}
                  onPress={() => handlePressContato(contato.link)}
                  disabled={!contato.link}
                >
                  <IconComponent 
                    name={contato.icon} 
                    size={isSmallScreen ? 14 : 16} 
                    color="#fff" 
                  />
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Layout responsivo */}
        {width >= 768 ? (
          // Layout para telas grandes - duas colunas
          <View style={[
            styles.gridContainer,
            isSmallScreen && styles.gridContainerSmall,
            isLargeScreen && styles.gridContainerLarge
          ]}>
            {/* Coluna Esquerda */}
            <View style={[
              styles.coluna,
              isSmallScreen && styles.colunaSmall
            ]}>
              {/* Seção de Contato */}
              <View style={[
                styles.card,
                isSmallScreen && styles.cardSmall,
                isLargeScreen && styles.cardLarge
              ]}>
                <View style={styles.tituloContainer}>
                  <MaterialIcons name="contact-mail" size={isSmallScreen ? 18 : 20} color="#6366f1" />
                  <Text style={[
                    styles.tituloSecao,
                    isSmallScreen && styles.tituloSecaoSmall
                  ]}>Contato</Text>
                </View>
                
                {contatos.map((contato, index) => {
                  const IconComponent = contato.library;
                  return (
                    <TouchableOpacity 
                      key={index} 
                      style={[
                        styles.contatoItem,
                        isSmallScreen && styles.contatoItemSmall
                      ]}
                      onPress={() => handlePressContato(contato.link)}
                      disabled={!contato.link}
                    >
                      <View style={[
                        styles.contatoIcon,
                        isSmallScreen && styles.contatoIconSmall
                      ]}>
                        <IconComponent name={contato.icon} size={isSmallScreen ? 16 : 18} color="#6366f1" />
                      </View>
                      <Text style={[
                        styles.contatoTexto,
                        isSmallScreen && styles.contatoTextoSmall
                      ]}>{contato.info}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>

              {/* Seção de Formação Acadêmica */}
              <View style={[
                styles.card,
                isSmallScreen && styles.cardSmall,
                isLargeScreen && styles.cardLarge
              ]}>
                <View style={styles.tituloContainer}>
                  <MaterialIcons name="school" size={isSmallScreen ? 18 : 20} color="#6366f1" />
                  <Text style={[
                    styles.tituloSecao,
                    isSmallScreen && styles.tituloSecaoSmall
                  ]}>Formação</Text>
                </View>
                
                {formacao.map(renderFormacao)}
              </View>

              {/* Seção de Hard Skills */}
              <View style={[
                styles.card,
                isSmallScreen && styles.cardSmall,
                isLargeScreen && styles.cardLarge
              ]}>
                <View style={styles.tituloContainer}>
                  <FontAwesome5 name="laptop-code" size={isSmallScreen ? 16 : 18} color="#6366f1" />
                  <Text style={[
                    styles.tituloSecao,
                    isSmallScreen && styles.tituloSecaoSmall
                  ]}>Hard Skills</Text>
                </View>
                
                <View style={styles.habilidadesContainer}>
                  {hardSkills.map((habilidade, index) => (
                    <View key={index} style={[
                      styles.habilidadeChip,
                      isSmallScreen && styles.habilidadeChipSmall
                    ]}>
                      <Text style={[
                        styles.habilidadeTexto,
                        isSmallScreen && styles.habilidadeTextoSmall
                      ]}>{habilidade}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>

            {/* Coluna Direita */}
            <View style={[
              styles.coluna,
              isSmallScreen && styles.colunaSmall
            ]}>
              {/* Seção de Experiência Profissional */}
              <View style={[
                styles.card,
                isSmallScreen && styles.cardSmall,
                isLargeScreen && styles.cardLarge
              ]}>
                <View style={styles.tituloContainer}>
                  <MaterialIcons name="work" size={isSmallScreen ? 18 : 20} color="#6366f1" />
                  <Text style={[
                    styles.tituloSecao,
                    isSmallScreen && styles.tituloSecaoSmall
                  ]}>Experiência</Text>
                </View>
                
                {experiencia.map(renderExperiencia)}
              </View>

              {/* Seção de Cursos Complementares */}
              <View style={[
                styles.card,
                isSmallScreen && styles.cardSmall,
                isLargeScreen && styles.cardLarge
              ]}>
                <View style={styles.tituloContainer}>
                  <MaterialIcons name="menu-book" size={isSmallScreen ? 18 : 20} color="#6366f1" />
                  <Text style={[
                    styles.tituloSecao,
                    isSmallScreen && styles.tituloSecaoSmall
                  ]}>Cursos</Text>
                </View>
                
                {cursos.map(renderCurso)}
              </View>

              {/* Seção de Soft Skills */}
              <View style={[
                styles.card,
                isSmallScreen && styles.cardSmall,
                isLargeScreen && styles.cardLarge
              ]}>
                <View style={styles.tituloContainer}>
                  <FontAwesome5 name="users" size={isSmallScreen ? 14 : 16} color="#6366f1" />
                  <Text style={[
                    styles.tituloSecao,
                    isSmallScreen && styles.tituloSecaoSmall
                  ]}>Soft Skills</Text>
                </View>
                
                <View style={styles.habilidadesContainer}>
                  {softSkills.map((habilidade, index) => (
                    <View key={index} style={[
                      styles.habilidadeChip,
                      styles.softSkillChip,
                      isSmallScreen && styles.habilidadeChipSmall
                    ]}>
                      <Text style={[
                        styles.habilidadeTexto,
                        styles.softSkillTexto,
                        isSmallScreen && styles.habilidadeTextoSmall
                      ]}>{habilidade}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          </View>
        ) : (
          // Layout para telas pequenas - uma coluna
          <View style={styles.singleColumn}>
            {/* Seção de Contato */}
            <View style={[
              styles.card,
              isSmallScreen && styles.cardSmall
            ]}>
              <View style={styles.tituloContainer}>
                <MaterialIcons name="contact-mail" size={isSmallScreen ? 18 : 20} color="#6366f1" />
                <Text style={[
                  styles.tituloSecao,
                  isSmallScreen && styles.tituloSecaoSmall
                ]}>Contato</Text>
              </View>
              
              {contatos.map((contato, index) => {
                const IconComponent = contato.library;
                return (
                  <TouchableOpacity 
                    key={index} 
                    style={[
                      styles.contatoItem,
                      isSmallScreen && styles.contatoItemSmall
                    ]}
                    onPress={() => handlePressContato(contato.link)}
                    disabled={!contato.link}
                  >
                    <View style={[
                      styles.contatoIcon,
                      isSmallScreen && styles.contatoIconSmall
                    ]}>
                      <IconComponent name={contato.icon} size={isSmallScreen ? 16 : 18} color="#6366f1" />
                    </View>
                    <Text style={[
                      styles.contatoTexto,
                      isSmallScreen && styles.contatoTextoSmall
                    ]}>{contato.info}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Seção de Experiência */}
            <View style={[
              styles.card,
              isSmallScreen && styles.cardSmall
            ]}>
              <View style={styles.tituloContainer}>
                <MaterialIcons name="work" size={isSmallScreen ? 18 : 20} color="#6366f1" />
                <Text style={[
                  styles.tituloSecao,
                  isSmallScreen && styles.tituloSecaoSmall
                ]}>Experiência</Text>
              </View>
              
              {experiencia.map(renderExperiencia)}
            </View>

            {/* Grid para Formação e Cursos em telas pequenas */}
            <View style={[
              styles.gridContainer,
              isSmallScreen && styles.gridContainerSmall
            ]}>
              <View style={[
                styles.coluna,
                isSmallScreen && styles.colunaSmall
              ]}>
                <View style={[
                  styles.card,
                  isSmallScreen && styles.cardSmall
                ]}>
                  <View style={styles.tituloContainer}>
                    <MaterialIcons name="school" size={isSmallScreen ? 18 : 20} color="#6366f1" />
                    <Text style={[
                      styles.tituloSecao,
                      isSmallScreen && styles.tituloSecaoSmall
                    ]}>Formação</Text>
                  </View>
                  {formacao.map(renderFormacao)}
                </View>
              </View>

              <View style={[
                styles.coluna,
                isSmallScreen && styles.colunaSmall
              ]}>
                <View style={[
                  styles.card,
                  isSmallScreen && styles.cardSmall
                ]}>
                  <View style={styles.tituloContainer}>
                    <MaterialIcons name="menu-book" size={isSmallScreen ? 18 : 20} color="#6366f1" />
                    <Text style={[
                      styles.tituloSecao,
                      isSmallScreen && styles.tituloSecaoSmall
                    ]}>Cursos</Text>
                  </View>
                  {cursos.map(renderCurso)}
                </View>
              </View>
            </View>

            {/* Seção de Hard Skills */}
            <View style={[
              styles.card,
              isSmallScreen && styles.cardSmall
            ]}>
              <View style={styles.tituloContainer}>
                <FontAwesome5 name="laptop-code" size={isSmallScreen ? 16 : 18} color="#6366f1" />
                <Text style={[
                  styles.tituloSecao,
                  isSmallScreen && styles.tituloSecaoSmall
                ]}>Hard Skills</Text>
              </View>
              
              <View style={styles.habilidadesContainer}>
                {hardSkills.map((habilidade, index) => (
                  <View key={index} style={[
                    styles.habilidadeChip,
                    isSmallScreen && styles.habilidadeChipSmall
                  ]}>
                    <Text style={[
                      styles.habilidadeTexto,
                      isSmallScreen && styles.habilidadeTextoSmall
                    ]}>{habilidade}</Text>
                  </View>
                ))}
              </View>
            </View>

            {/* Seção de Soft Skills */}
            <View style={[
              styles.card,
              isSmallScreen && styles.cardSmall
            ]}>
              <View style={styles.tituloContainer}>
                <FontAwesome5 name="users" size={isSmallScreen ? 14 : 16} color="#6366f1" />
                <Text style={[
                  styles.tituloSecao,
                  isSmallScreen && styles.tituloSecaoSmall
                ]}>Soft Skills</Text>
              </View>
              
              <View style={styles.habilidadesContainer}>
                {softSkills.map((habilidade, index) => (
                  <View key={index} style={[
                    styles.habilidadeChip,
                    styles.softSkillChip,
                    isSmallScreen && styles.habilidadeChipSmall
                  ]}>
                    <Text style={[
                      styles.habilidadeTexto,
                      styles.softSkillTexto,
                      isSmallScreen && styles.habilidadeTextoSmall
                    ]}>{habilidade}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        )}

        {/* Footer */}
        <View style={[
          styles.footer,
          isSmallScreen && styles.footerSmall
        ]}>
          <Text style={[
            styles.footerText,
            isSmallScreen && styles.footerTextSmall
          ]}>Disponível para oportunidades</Text>
          <Text style={[
            styles.footerSubtext,
            isSmallScreen && styles.footerSubtextSmall
          ]}>Vamos conversar! 👋</Text>
        </View>
      </ScrollView>
    </View>
  );
}

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  scrollContent: {
    paddingBottom: 20,
  },
  scrollContentSmall: {
    paddingBottom: 15,
  },
  singleColumn: {
    padding: 12,
    gap: 12,
  },
  
  // Header
  header: {
    backgroundColor: '#6366f1',
    alignItems: 'center',
    paddingVertical: 35,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  headerSmall: {
    paddingVertical: 25,
    paddingHorizontal: 15,
  },
  headerLarge: {
    paddingVertical: 45,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  foto: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 4,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  fotoSmall: {
    width: 90,
    height: 90,
    borderRadius: 45,
  },
  fotoLarge: {
    width: 130,
    height: 130,
    borderRadius: 65,
  },
  verificado: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: '#10b981',
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  verificadoSmall: {
    width: 20,
    height: 20,
    borderRadius: 10,
    bottom: 2,
    right: 2,
  },
  nome: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
    textAlign: 'center',
  },
  nomeSmall: {
    fontSize: 22,
  },
  nomeLarge: {
    fontSize: 30,
  },
  profissao: {
    fontSize: 16,
    color: '#e0e7ff',
    marginBottom: 12,
    textAlign: 'center',
    fontWeight: '600',
  },
  profissaoSmall: {
    fontSize: 14,
  },
  profissaoLarge: {
    fontSize: 18,
  },
  descricaoHeader: {
    fontSize: 14,
    color: '#e0e7ff',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 20,
  },
  descricaoHeaderSmall: {
    fontSize: 12,
    lineHeight: 18,
  },
  descricaoHeaderLarge: {
    fontSize: 16,
    lineHeight: 22,
  },
  contatosRapidos: {
    flexDirection: 'row',
    gap: 12,
  },
  contatosRapidosSmall: {
    gap: 8,
  },
  contatoRapido: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contatoRapidoSmall: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },

  // Grid
  gridContainer: {
    flexDirection: 'row',
    padding: 12,
    gap: 12,
  },
  gridContainerSmall: {
    padding: 8,
    gap: 8,
  },
  gridContainerLarge: {
    padding: 16,
    gap: 16,
  },
  coluna: {
    flex: 1,
    gap: 12,
  },
  colunaSmall: {
    gap: 8,
  },

  // Cards
  card: {
    backgroundColor: '#fff',
    padding: 18,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  cardSmall: {
    padding: 14,
    borderRadius: 12,
  },
  cardLarge: {
    padding: 22,
    borderRadius: 20,
  },

  // Títulos
  tituloContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  tituloSecao: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#1e293b',
    marginLeft: 8,
  },
  tituloSecaoSmall: {
    fontSize: 15,
  },

  // Experiência
  experienciaItem: {
    marginBottom: 18,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  experienciaItemSmall: {
    marginBottom: 14,
    paddingBottom: 12,
  },
  experienciaHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 6,
  },
  experienciaInfo: {
    flex: 1,
  },
  experienciaIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#6366f1',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  experienciaIconSmall: {
    width: 26,
    height: 26,
    borderRadius: 13,
    marginRight: 8,
  },
  empresa: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 2,
  },
  empresaSmall: {
    fontSize: 13,
  },
  cargo: {
    fontSize: 13,
    color: '#6366f1',
    marginBottom: 6,
    fontWeight: '600',
  },
  cargoSmall: {
    fontSize: 12,
  },
  periodo: {
    fontSize: 11,
    color: '#64748b',
    fontStyle: 'italic',
  },
  periodoSmall: {
    fontSize: 10,
  },
  descricaoExperiencia: {
    fontSize: 12,
    lineHeight: 18,
    color: '#475569',
    marginBottom: 6,
  },
  descricaoExperienciaSmall: {
    fontSize: 11,
    lineHeight: 16,
  },
  linkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  linkProjeto: {
    fontSize: 11,
    color: '#6366f1',
    fontWeight: '500',
    marginLeft: 4,
  },
  linkProjetoSmall: {
    fontSize: 10,
  },

  // Formação
  formacaoItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 14,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  formacaoItemSmall: {
    marginBottom: 12,
    paddingBottom: 12,
  },
  formacaoIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#f1f5f9',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    marginTop: 2,
  },
  formacaoIconSmall: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 8,
  },
  formacaoContent: {
    flex: 1,
  },
  curso: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 2,
  },
  cursoSmall: {
    fontSize: 12,
  },
  instituicao: {
    fontSize: 12,
    color: '#6366f1',
    marginBottom: 2,
    fontWeight: '500',
  },
  instituicaoSmall: {
    fontSize: 11,
  },

  // Cursos
  cursoItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  cursoItemSmall: {
    marginBottom: 10,
    paddingBottom: 10,
  },
  cursoIcon: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#f1f5f9',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    marginTop: 2,
  },
  cursoIconSmall: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 8,
  },
  cursoContent: {
    flex: 1,
  },
  cursoNome: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 2,
  },
  cursoNomeSmall: {
    fontSize: 11,
  },
  cursoInstituicao: {
    fontSize: 11,
    color: '#6366f1',
    marginBottom: 2,
    fontWeight: '500',
  },
  cursoInstituicaoSmall: {
    fontSize: 10,
  },
  cursoPeriodo: {
    fontSize: 10,
    color: '#64748b',
    fontStyle: 'italic',
  },
  cursoPeriodoSmall: {
    fontSize: 9,
  },

  // Habilidades
  habilidadesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  habilidadeChip: {
    backgroundColor: '#e0e7ff',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
  },
  habilidadeChipSmall: {
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 14,
  },
  habilidadeTexto: {
    fontSize: 11,
    color: '#3730a3',
    fontWeight: '500',
  },
  habilidadeTextoSmall: {
    fontSize: 10,
  },
  softSkillChip: {
    backgroundColor: '#dcfce7',
  },
  softSkillTexto: {
    color: '#166534',
  },

  // Contato
  contatoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    paddingVertical: 4,
  },
  contatoItemSmall: {
    marginBottom: 10,
  },
  contatoIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#f1f5f9',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  contatoIconSmall: {
    width: 26,
    height: 26,
    borderRadius: 13,
    marginRight: 8,
  },
  contatoTexto: {
    fontSize: 13,
    color: '#475569',
    fontWeight: '500',
  },
  contatoTextoSmall: {
    fontSize: 12,
  },

  // Footer
  footer: {
    backgroundColor: '#1e293b',
    paddingVertical: 20,
    alignItems: 'center',
    marginTop: 10,
    marginHorizontal: 12,
    borderRadius: 16,
  },
  footerSmall: {
    paddingVertical: 16,
    marginHorizontal: 8,
    borderRadius: 12,
  },
  footerText: {
    fontSize: 15,
    color: '#fff',
    fontWeight: '600',
    marginBottom: 4,
  },
  footerTextSmall: {
    fontSize: 13,
  },
  footerSubtext: {
    fontSize: 13,
    color: '#cbd5e1',
  },
  footerSubtextSmall: {
    fontSize: 12,
  },
});