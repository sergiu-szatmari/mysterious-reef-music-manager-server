export function generateId(length: number = 5): string {

    const chars: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result: string = '';

    for (let i = 0; i < length; i++ ) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return result;
}

export function greet() {

    console.log("Welcome to the TS-Music App");
    console.log();
    console.log();
    console.log();
}