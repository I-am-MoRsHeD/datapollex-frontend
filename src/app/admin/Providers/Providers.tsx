'use client'
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';


const queryClient = new QueryClient();
const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
            <Toaster
                position="top-center"
                // reverseOrder={true}
                toastOptions={{
                    style: {
                        padding: "0.725rem",
                        color: "#08195E",
                    },
                    success: {
                        style: {
                            // border: '1px solid #723eeb',
                        },
                        iconTheme: {
                            primary: "#08195E",
                            secondary: "#fff",
                        },
                    },
                    error: {
                        style: {
                            // border: '1px solid #dc3545',
                            color: "#08195E",
                        },
                        iconTheme: {
                            primary: "#dc3545",
                            secondary: "#fff",
                        },
                    },
                    iconTheme: {
                        primary: "#08195E",
                        secondary: "#FFFAEE",
                    },
                }}
            />
        </QueryClientProvider>
    );
};

export default Providers;