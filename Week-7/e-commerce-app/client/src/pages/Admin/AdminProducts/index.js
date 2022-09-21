import { Button, Flex, Text } from "@chakra-ui/react";
import { Table } from "antd";
import { useMutation, useQuery, useQueryClient } from "react-query"
import { deleteProduct, fetchProductList } from "../../../api";
import { Link } from "react-router-dom";
import { Popconfirm } from "antd";
import { useMemo } from "react";


const AdminProducts = () => {
    const queryClient = useQueryClient();
    const { isLoading, isError, data, error } = useQuery("admin:products", fetchProductList);

    //Silme işlemi için kullanılır
    const deleteMutation = useMutation(deleteProduct, {
        onSuccess: () => queryClient.invalidateQueries("admin:products")
    })

    const columns = useMemo(() => {
        return [
            {
                title: 'title',
                dataIndex: 'title',
                key: 'title',
            },
            {
                title: 'Price',
                dataIndex: 'price',
                key: 'price',
            },
            {
                title: 'Created At',
                dataIndex: 'createdAt',
                key: 'createdAt',
            },
            {
                title: 'Action',
                key: 'action',
                render: (text, record) =>
                    <>
                        <Link to={`/admin/products/${record._id}`}>Edit</Link>
                        <Popconfirm
                            title="Are you sure ?"
                            onConfirm={() => deleteMutation.mutate(record._id, {
                                onSuccess: () => {
                                    console.log("success")
                                }
                            })}
                            onCancel={() => alert("iptal edildi")}
                            okText="Yes"
                            cancelText="No"
                            placement="left"
                        >
                            <a href="/#" style={{ marginLeft: 10 }}>Delete</a>
                        </Popconfirm>
                    </>
            }
        ]
    }, []);


    if (isLoading)
        return <div>Loading...</div>

    if (isError)
        return <div>Error! {error.message}</div>

    console.log(data)
    return (
        <div>

            <Flex justifyContent="space-between" alignItems="center">
                <Text fontSize="2xl">Products</Text>
                <Link to="/admin/products/new">
                    <Button>New</Button>
                </Link>

            </Flex>


            <Table dataSource={data} columns={columns} rowKey="_id"></Table>
        </div>
    )
}

export default AdminProducts