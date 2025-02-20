export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      noms: {
        Row: {               // the data expected from .select()
          id: number
          nom: string
        }
        Insert: {            // the data to be passed to .insert()
          id?: never         // generated columns must not be supplied
          nom: string       // `not null` columns with no default must be supplied
        }
        Update: {            // the data to be passed to .update()
          id?: never
          nom?: string      // `not null` columns are optional on .update()
        }
      }
    }
  }
}