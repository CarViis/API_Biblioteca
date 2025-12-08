import Emprestimo from '#models/emprestimo'

export class EmprestimoService {
  public async createEmprestimo(data: Partial<Emprestimo>) {
    const emprestimo = await Emprestimo.create(data)
    
    if (emprestimo.data_devolucao && emprestimo.data_devolucao_esperada) {
      const differenceInDays = emprestimo.data_devolucao.getTime() - emprestimo.data_devolucao_esperada.getTime()
      emprestimo.status = differenceInDays > 0 ? 'atrasado' : 'ativo'
      await emprestimo.save()
    }
    
    return emprestimo
  }
  
  public async calcularMulta(emprestimoId: number, valorDiario: number): Promise<number> {
    const emprestimo = await Emprestimo.findOrFail(emprestimoId)
    
    if (!emprestimo.data_devolucao || !emprestimo.data_devolucao_esperada) {
      return 0
    }
    
    const diffTime = emprestimo.data_devolucao.getTime() - emprestimo.data_devolucao_esperada.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays > 0) {
      return diffDays * valorDiario
    }
    
    return 0
  }

}