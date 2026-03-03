class Filme {
    constructor(
        private titulo: string,
        private ano: number,
        private genero: string,
        private valorLocacao: number
    ) {}

    public getTitulo(): string {
        return this.titulo;
    }

    public getValorLocacao(): number {
        return this.valorLocacao;
    }
}

class Locacao {
    private data: Date;
    private valorTotalAPagar: number = 0;
    private listaFilmes: Filme[] = [];
    private readonly MAX_FILMES = 10;

    constructor(data: Date) {
        this.data = data;
    }

    public addFilme(filme: Filme): boolean {
        if (this.listaFilmes.length < this.MAX_FILMES) {
            this.listaFilmes.push(filme);
            this.valorTotalAPagar += filme.getValorLocacao();
            return true;
        }
        return false;
    }

    public getValorTotalAPagar(): number {
        return this.valorTotalAPagar;
    }

    public getResumoExtrato(): { dataStr: string, filmesStr: string, valorStr: string } {
        const dataStr = this.data.toString().substring(0, 24);
        const filmesStr = this.listaFilmes.map(filme => filme.getTitulo()).join(', ');
        const valorStr = this.valorTotalAPagar.toFixed(2);
        
        return { dataStr, filmesStr, valorStr };
    }
}

class Cliente {
    constructor(
        private nome: string,
        private cpf: string,
        private endereco: string,
        private telefone: string
    ) {}

    public getNome(): string {
        return this.nome;
    }
}

class Conta {
    private cliente: Cliente;
    private numero: number;
    private saldoDevedor: number = 0.0;
    private historicoLocacao: Locacao[] = [];
    private readonly MAX_LOCACOES = 20;

    constructor(cliente: Cliente, numero: number) {
        this.cliente = cliente;
        this.numero = numero;
    }

    
    public getCliente(): Cliente {
        return this.cliente;
    }
    

    public locarFilmes(filmes: Filme[]): void {
        if (this.historicoLocacao.length < this.MAX_LOCACOES) {
            const dataLocacao = new Date();
            const novaLocacao = new Locacao(dataLocacao);

            filmes.forEach(filme => novaLocacao.addFilme(filme));

            if (novaLocacao.getValorTotalAPagar() > 0) {
                this.historicoLocacao.push(novaLocacao);
                this.saldoDevedor += novaLocacao.getValorTotalAPagar();
                console.log(`Locação registrada para ${this.cliente.getNome()}. Total: R$ ${novaLocacao.getValorTotalAPagar().toFixed(2)}`);
            } else {
                 console.log(`Nenhum filme válido adicionado à locação de ${this.cliente.getNome()}.`);
            }
        } else {
            console.warn(`Limite de ${this.MAX_LOCACOES} locações atingido para a conta ${this.numero}.`);
        }
    }

    public pagarDebito(valor: number): void {
        if (valor > 0) {
            const valorPago = Math.min(valor, this.saldoDevedor);
            this.saldoDevedor -= valorPago;
            
            console.log(`\nPagamento de R$ ${valor.toFixed(2)} realizado por ${this.cliente.getNome()}. Valor aplicado: R$ ${valorPago.toFixed(2)}.`);
            console.log(`Novo Saldo Devedor: R$ ${this.saldoDevedor.toFixed(2)}`);
        } else {
            console.log("Valor de pagamento inválido.");
        }
    }

    public extratoHistorico(): string {
        const nomeCliente = this.cliente.getNome();
        let extrato = `.:: Histórico de Locações de ${nomeCliente} ::.\n`;
        extrato += `Data da Locação | Lista de Filmes | Valor da Locação (R$)\n`;
        extrato += `----------------|-----------------|----------------------\n`;

        if (this.historicoLocacao.length === 0) {
            extrato += `Nenhuma locação encontrada.\n`;
        } else {
            for (const locacao of this.historicoLocacao) {
                const resumo = locacao.getResumoExtrato();
                extrato += `${resumo.dataStr} | ${resumo.filmesStr} | ${resumo.valorStr}\n`;
            }
        }
        
        extrato += `Saldo Devedor Atual: R$ ${this.saldoDevedor.toFixed(2)}\n`;

        return extrato;
    }

    public getSaldoDevedor(): number {
        return this.saldoDevedor;
    }
}

class Principal {
    public static main(): void {
        console.log("--- Sistema de Locadora de Filmes - Inicialização ---\n");

        const filmes: Filme[] = [
            new Filme("Salt", 2010, "Ação", 7.00),
            new Filme("Heroes (S01E01)", 2006, "Série", 5.00),
            new Filme("X-Men First Class", 2011, "Ação/Sci-fi", 5.00),
            new Filme("Inception", 2010, "Sci-fi", 8.50),
            new Filme("A Rede Social", 2010, "Drama", 6.50),
            new Filme("O Segredo dos Seus Olhos", 2009, "Suspense", 7.00),
            new Filme("Toy Story 3", 2010, "Animação", 4.00),
            new Filme("Mad Max: Estrada da Fúria", 2015, "Ação", 9.00),
            new Filme("A Chegada", 2016, "Sci-fi", 8.00),
            new Filme("Whiplash", 2014, "Drama/Musical", 6.00),
            new Filme("Birdman", 2014, "Comédia/Drama", 7.50),
        ];
        console.log(`Total de ${filmes.length} filmes cadastrados.`);


        const cliente1 = new Cliente("Danilo Farias", "111.111.111-11", "Rua A, 100", "9999-1111");
        const cliente2 = new Cliente("Ana Souza", "222.222.222-22", "Av. B, 200", "9999-2222");
        const cliente3 = new Cliente("Pedro Rocha", "333.333.333-33", "Rua C, 300", "9999-3333");

        const conta1 = new Conta(cliente1, 1001);
        const conta2 = new Conta(cliente2, 1002);
        const conta3 = new Conta(cliente3, 1003);
        
       
        console.log(`Contas ${conta1.getCliente().getNome()}, ${conta2.getCliente().getNome()} e ${conta3.getCliente().getNome()} criadas.`);

        
        console.log("\n--- Locações de Danilo Farias (4) ---");
        conta1.locarFilmes([filmes[0], filmes[1]]);
        conta1.locarFilmes([filmes[2]]);
        conta1.locarFilmes([filmes[3], filmes[4], filmes[5]]);
        conta1.locarFilmes([filmes[6], filmes[7], filmes[8], filmes[9], filmes[10]]);

        
        console.log("\n--- Locações de Ana Souza (5) ---");
        conta2.locarFilmes([filmes[3]]);
        conta2.locarFilmes([filmes[0], filmes[2], filmes[4], filmes[6], filmes[8]]);
        conta2.locarFilmes([filmes[10], filmes[1]]);
        conta2.locarFilmes([filmes[5], filmes[7], filmes[9]]);
        conta2.locarFilmes([filmes[1], filmes[4], filmes[7], filmes[10]]);

       
        console.log("\n--- Locações de Pedro Rocha (6) ---");
        conta3.locarFilmes([filmes[1], filmes[3], filmes[5], filmes[7]]);
        conta3.locarFilmes([filmes[9]]);
        conta3.locarFilmes([filmes[0], filmes[2], filmes[4], filmes[6], filmes[8]]);
        conta3.locarFilmes([filmes[10], filmes[1]]);
        conta3.locarFilmes([filmes[3]]);
        conta3.locarFilmes([filmes[5], filmes[7], filmes[9]]);
        
        
        conta1.pagarDebito(5.0);
        conta3.pagarDebito(60.00);

        
        console.log("\n\n--- EXTRATOS DE LOCAÇÃO ---\n");

        console.log(conta1.extratoHistorico());
        console.log("\n-----------------------------\n");
        console.log(conta2.extratoHistorico());
        console.log("\n-----------------------------\n");
        console.log(conta3.extratoHistorico());
    }
}

Principal.main();