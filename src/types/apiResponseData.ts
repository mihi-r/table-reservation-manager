/* eslint-disable import/prefer-default-export */
export interface Admin {
    /**
     * The unique identifier of the admin.
     */
    id: number,

    /**
     * The name of the admin.
     */
    name: string,

    /**
     * The email of the admin.
     */
    email: string,
}

export type Admins = Array<Admin>;
