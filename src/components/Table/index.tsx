import { ITransaction } from "@/types/transaction"
import { formatDate, formatPrice } from "@/utils"

export type TableProps = {
    data: ITransaction[]
    onDelete: (id: string) => void
    onEdit: (transaction: ITransaction) => void
}

export const Table = ({ data, onDelete, onEdit }: TableProps) => {

    const handleDelete = (id: string) => {
        const confirmDelete = confirm("Tem certeza que deseja excluir esta transação?");
        
        if (confirmDelete) {
            onDelete(id);
        }
    }

    return (
        <table className="w-full mt-16 border-separate border-spacing-y-2">
            <thead>
                <tr>
                   <th className="px-4 text-left text-table-header text-base font-medium">Título</th> 
                   <th className="px-4 text-left text-table-header text-base font-medium">Preço</th> 
                   <th className="px-4 text-left text-table-header text-base font-medium">Categoria</th> 
                   <th className="px-4 text-left text-table-header text-base font-medium">Data</th> 
                   <th className="px-4 text-left text-table-header text-base font-medium">Ações</th> 
                </tr>
            </thead> 

            <tbody>
               {data.map(transaction => (
                <tr key={transaction.id} className="h-16">
                   <td className="px-4 py-4 whitespace-nowrap text-title bg-white rounded-l-lg">
                     {transaction.title}
                   </td> 

                   <td className={`px-4 py-4 whitespace-nowrap ${
                     transaction.type === "INCOME" ? "text-income" : "text-outcome"
                   } bg-white text-right`}>
                     {formatPrice(transaction.price)}
                   </td> 

                   <td className="px-4 py-4 whitespace-nowrap text-title bg-white">
                     {transaction.category}
                   </td>

                   <td className="px-4 py-4 whitespace-nowrap text-title bg-white">
                     {formatDate(transaction.data)}
                   </td>

                   <td className="px-4 py-4 whitespace-nowrap text-title bg-white rounded-r-lg">
                     <div className="flex gap-2">
                        <button 
                          onClick={() => onEdit(transaction)}
                          className="text-blue-500 hover:underline"
                        >
                          Editar
                        </button>

                        <button 
                          onClick={() => handleDelete(transaction.id)}
                          className="text-red-500 hover:underline"
                        >
                          Excluir
                        </button>
                     </div>
                   </td>
                </tr>
               ))} 
            </tbody>
        </table>
    )
}
