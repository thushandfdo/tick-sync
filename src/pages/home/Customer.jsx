import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

// local imports
import { useEffect, useState } from 'react';
import { Dropdown, Label, PrimaryButton, Section, TextBox } from '../../components';

const schema = yup.object({
    ticketRetrievalRate: yup
        .number()
        .positive()
        .integer()
        .required()
        .typeError('Ticket Retrieval Rate must be a number'),
    maxTicketCapacity: yup
        .number()
        .positive()
        .integer()
        .required()
        .typeError('Max Ticket Capacity must be a number')
});

const Customer = ({ isOn }) => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schema)
    });

    const [customers, setCustomers] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState('Select Customer');
    const [newCustomer, setNewCustomer] = useState('');
    const [isCustomerNameError, setIsCustomerNameError] = useState(false);

    useEffect(() => {
        setCustomers(['Customer 1', 'Customer 2', 'Customer 3']);
    }, []);

    useEffect(() => {
        if (newCustomer) {
            setIsCustomerNameError(false);
        }
    }, [newCustomer]);

    const handleAddCustomer = () => {
        if (!newCustomer) {
            setIsCustomerNameError(true);
            return;
        }
        alert('Customer added: ' + newCustomer);
    };

    const handleSaveConfigurations = (data) => {
        alert('Configurations saved: ' + JSON.stringify(data));
    };

    return (
        <div className="w-10/12 mx-auto my-5">
            <Section title="Add new Customer" className="mb-20">
                <div className="flex items-center gap-2">
                    <Label>Customer Name:</Label>
                    <TextBox value={newCustomer} onChange={(e) => setNewCustomer(e.target.value)} />
                    <PrimaryButton text="Add Customer" onClick={handleAddCustomer} disabled={!isOn} />
                    {isCustomerNameError && (
                        <Label variant="error">Customer name is required</Label>
                    )}
                </div>
            </Section>

            <Section title="Set Customer Configurations">
                <div className="flex items-center gap-2">
                    <Label>Select Customer:</Label>
                    <Dropdown
                        items={customers}
                        selectedItem={selectedCustomer}
                        setSelectedItem={setSelectedCustomer}
                    />
                </div>

                <hr className="h-0.5 my-5 bg-gray-300 border-0" />
                <Label variant="h3">Customer Configurations:</Label>

                <form className="ml-4 grid grid-cols-[200px_1fr] gap-4 mb-2">
                    <Label>Ticket Retrieval Rate:</Label>
                    <TextBox
                        name="ticketRetrievalRate"
                        register={register}
                        errors={errors}
                        placeholder="Enter a number"
                    />

                    <Label>Max Ticket Capacity:</Label>
                    <TextBox
                        name="maxTicketCapacity"
                        register={register}
                        errors={errors}
                        placeholder="Enter a number"
                    />
                </form>

                <PrimaryButton
                    text="Save Configurations"
                    onClick={handleSubmit((data) => handleSaveConfigurations(data))}
                    disabled={!isOn}
                />
            </Section>
        </div>
    );
};

export default Customer;
