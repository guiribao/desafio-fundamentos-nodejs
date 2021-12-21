import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface TransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: TransactionDTO): Transaction {
    if(!["income", "outcome"].includes(type)) {
      throw new Error("Tipo de transação inválido");
    }

    const { total } = this.transactionsRepository.getBalance()

    if(type === "outcome" && total < value) {
      throw new Error("Você não tem saldo suficiente");
    }

    let transaction = this.transactionsRepository.create({ title, value, type })

    return transaction;
  }
}

export default CreateTransactionService;
