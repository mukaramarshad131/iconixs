'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import { useUserActions } from '@/store/userStore';
import { Button, Checkbox, Col, Divider, Form, Row, Input, notification } from 'antd';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import iconix from '@/assets/images/IconixLogo.png';
import dashboardimg from '@/assets/images/logo-12.svg';

export default function Page() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <TokenPage />
        </Suspense>
    );
}

function TokenPage() {
    const { setUserInfo, setUserPermissions } = useUserActions();
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get('token');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (token) {
            loginWithToken(token);
        }
    }, [token]);

    const loginWithToken = async (token: string) => {
        try {
            setIsLoading(true);
            const response = await fetch('/api/decode-token', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                setError(errorData.error);
                setIsLoading(false);
                return;
            }

            const data = await response.json();
            const logIn = { email: data.user.email, password: data.user.name };
            const logInRes = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(logIn),
            });

            const response2 = await logInRes.json();
            if (!logInRes.ok) {
                notification.error({ message: response2.message, duration: 3 });
                setIsLoading(false);
                return;
            }

            const permissions = ["/dashboard", "/dashboard/intake-form", "/dashboard/summary", "/dashboard/follow-up-form", "/dashboard/update-password"];
            setUserInfo(response2.user);
            setUserPermissions(permissions);
            router.push('/dashboard');
            setError('');
        } catch (err) {
            console.error(err);
            setError('Something went wrong!');
        }
    };

    const handleFinish = (values: any) => {};

    return (
        <section className="relative flex !min-h-screen !w-full !flex-row">
            <div
                className="hidden grow flex-col items-center justify-around bg-center bg-no-repeat md:flex"
                style={{
                    background: '#0c2345',
                }}
            >
                <Image
                    src={iconix}
                    width={300}
                    height={200}
                    className="mt-[20px] max-w-[300px] xl:max-w-[400px] mx-[20px]"
                    alt="Iconix"
                    priority
                />
            </div>

            <div className="m-auto flex !h-screen w-full max-w-[580px] flex-col justify-center ">
                <section className="px-[16px] lg:px-[64px]">
                    <div className="flex sm:flex md:hidden lg:hidden xl:hidden justify-center items-start">
                        <Image
                            src={dashboardimg}
                            width={300}
                            height={200}
                            alt="Iconix"
                            className="block sm:block md:hidden lg:hidden xl:hidden max-w-[300px] w-[250px]"
                        />
                    </div>
                    <div className="mb-4 text-2xl font-bold xl:text-3xl">Sign In</div>
                    <Form name="login" size="large" onFinish={handleFinish}>
                        <Form.Item
                            name="email"
                            rules={[{ type: 'email', required: true, message: 'Email is required.' }]}
                        >
                            <Input placeholder="Please enter Email" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: 'Password is required.' }]}
                        >
                            <Input.Password type="password" placeholder="Please enter Password" />
                        </Form.Item>
                        <Form.Item>
                            <Row>
                                <Col span={12}>
                                    <Form.Item name="remember" valuePropName="checked" noStyle>
                                        <Checkbox>Remember me</Checkbox>
                                    </Form.Item>
                                </Col>
                                <Col span={12} className="text-right">
                                    <span className="!underline">Forget Password</span>
                                </Col>
                            </Row>
                        </Form.Item>
                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                className="w-full !bg-[#0c2345]"
                                loading={isLoading}
                            >
                                Log In
                            </Button>
                        </Form.Item>
                        <Divider className="!text-xs">
                            <Button className="w-full !text-sm">Sign Up</Button>
                        </Divider>
                    </Form>
                </section>
            </div>
        </section>
    );
}
