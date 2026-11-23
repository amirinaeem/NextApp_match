'use client';

import { Button, Card, CardHeader, FieldError, Input, TextField, toast } from "@heroui/react";
import { GiPadlock } from "react-icons/gi";
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, RegisterSchema } from "@/lib/schemas/registerSchema";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";





export default function RegisterForm() {

    const router = useRouter()

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<RegisterSchema>({
        resolver: zodResolver(registerSchema),
    });

    const onSubmit = async (data: RegisterSchema) => {
        console.log('Registration data:', data);

        try {
            const result = await authClient.signUp.email({
                email: data.email,
                password: data.password,
                name: data.name
            });

            console.log('Registration result:', result);

            if (result.error) {
                toast.danger(result.error.message);
                return;
            }

            router.push('/members');
            router.refresh();

        } catch (error) {
            console.error('Registration failed:', error);
            toast.danger('Something went wrong during registration');
        }
    };

    return (
        <Card className="w-md shadow-xl">
            <CardHeader className="flex flex-col items-center justify-center">
                <div className="flex flex-col gap-2 items-center">
                    <div className="flex flex-row items-center gap-3">
                        <GiPadlock size={30} />
                        <h1 className="text-3xl font-semibold">Register</h1>
                    </div>
                    <p className="text-foreground/60">Try to register first you idiot!!</p>
                </div>
            </CardHeader>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 px-6 py-4">

                <TextField
                    aria-label="name"
                    isInvalid={!!errors.name}
                >
                    <Input
                        type="text"
                        placeholder="Enter Your name"
                        {...register('name')}
                    />

                    <FieldError>{errors.name?.message}</FieldError>
                </TextField>

                <TextField
                    aria-label="email"
                    isInvalid={!!errors.email}
                >
                    <Input
                        type="email"
                        placeholder="Enter Your Email"
                        {...register('email')}
                    />

                    <FieldError>{errors.email?.message}</FieldError>
                </TextField>

                <TextField
                    aria-label="password"
                    isInvalid={!!errors.password}
                >
                    <Input
                        type="password"
                        placeholder="Enter Your Password"
                        {...register('password')}
                    />

                    <FieldError>{errors.password?.message}</FieldError>
                </TextField>
                <TextField
                    aria-label="confirm Password"
                    isInvalid={!!errors.confirmPassword}
                >
                    <Input
                        type="password"
                        placeholder="Enter Your confirmPassword"
                        {...register('confirmPassword')}
                    />

                    <FieldError>{errors.confirmPassword?.message}</FieldError>
                </TextField>

                <Button isPending={isSubmitting} type="submit" className="w-full">Sign in</Button>
            </form>
        </Card >
    )
}