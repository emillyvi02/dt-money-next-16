import { ITransaction } from "@/types/transaction";
import { Input } from "../Form/Input";
import { TransactionSwitcher } from "../TransactionSwitcher";
import { TransactionType } from "@/types/transaction";
import { TransactionFormData, transactionSchema, defaultValues } from "./schema";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";

export type FormModalProps = {
   title: string;
   closeModal: () => void;
   addTransaction: (transaction: ITransaction) => void;
   initialData?: ITransaction | null;
}

export const FormModal = ({ title, closeModal, addTransaction, initialData }: FormModalProps) => {
  
  const {
    handleSubmit,
    register,
    formState: { errors},
    setValue,
    watch
  } = useForm<TransactionFormData>({
    resolver: yupResolver(transactionSchema),
    defaultValues
  })  

  useEffect(() => {
    if (initialData) {
      setValue("title", initialData.title);
      setValue("price", initialData.price);
      setValue("category", initialData.category);
      setValue("type", initialData.type);
    }
  }, [initialData, setValue]);

  const handleTypeChange = (type: TransactionType) => {
    setValue("type", type);
  }

  const handleSubmitForm = (data: TransactionFormData) => {
    const transaction: ITransaction = {
      ...data,
      id: initialData ? initialData.id : String(Date.now()),
      data: initialData ? initialData.data : new Date(),
    };

    addTransaction(transaction);
    closeModal();
  }

  const type = watch("type");

  return (
    <div className="relative z-10 min-w-xl">
       <div className="fixed inset-0 bg-gray-700 opacity-75" />

       <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
           <div className="flex min-h-full items-center justify-center p-4">
                <div className="relative transform overflow-hidden rounded-lg bg-modal text-left shadow-xl sm:w-full sm:max-w-lg">
                    
                    <button 
                      type="button"
                      className="absolute top-0 right-0 mt-4 mr-5 text-gray-400 hover:text-gray-600"
                      onClick={closeModal}
                    >
                        <span className="text-2xl">&times;</span>
                    </button>

                    <div className="px-6 pt-6">
                        <h1 className="font-semibold text-title text-2xl">
                          {title}
                        </h1>
                    </div>
                    
                    <form 
                      className="flex flex-col gap-4 px-6 mt-4 mb-6"
                      onSubmit={handleSubmit(handleSubmitForm)}
                    >
                        <Input 
                           type="text"
                           placeholder="Nome"   
                           {...register("title")}
                           error={errors.title?.message}
                        />

                        <Input 
                          type="number"
                          placeholder="Preço"   
                          {...register("price")}
                          error={errors.price?.message}
                        />

                        <TransactionSwitcher 
                          type={type as TransactionType}
                          handleTypeChange={handleTypeChange}
                        />

                        {errors.type && (
                          <span className="text-red-500">
                            {errors.type.message}
                          </span>
                        )}

                        <Input 
                           type="text"
                           placeholder="Categoria"  
                           {...register("category")} 
                           error={errors.category?.message}
                        />
                         
                        <button 
                           type="submit"
                           className="mt-6 w-full rounded-md bg-income text-white py-3 font-semibold hover:opacity-80"
                        >
                           Confirmar     
                        </button> 
                    </form>

                </div>
           </div>
        </div> 
    </div>
  )
}



