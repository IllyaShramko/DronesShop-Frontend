import Select from 'react-select';
import { useForm, Controller } from "react-hook-form"
import styles from "./make-order.module.css"
import { City, MakeOrderFormState, MakeOrderProps, Warehouse } from "./make-order.types"
import { useCartContext, useUserContext } from "../../context"
import { useEffect, useState } from "react"
import { ICONS } from "../../shared/icons"
import { ProductsListWithoutControllers } from '../../components';
import { useMakeOrder } from '../../hooks';
import { Link, useNavigate } from 'react-router-dom';
import { API_URL, MakeOrderCredentials } from '../../shared/api';
import { useFormatNumber } from '../../shared/hooks/use-format-number';

const POPULAR_CITIES = [
    { Description: 'Вінниця', Ref: 'db5c88de-391c-11dd-90d9-001a92567626' },
    { Description: 'Київ', Ref: '8d5a980d-391c-11dd-90d9-001a92567626' },
    { Description: 'Харків', Ref: 'db5c88e0-391c-11dd-90d9-001a92567626' },
    { Description: 'Одеса', Ref: 'db5c88d0-391c-11dd-90d9-001a92567626' },
    { Description: 'Дніпро', Ref: 'db5c88f0-391c-11dd-90d9-001a92567626' },
    { Description: 'Львів', Ref: 'db5c88f5-391c-11dd-90d9-001a92567626' },
    { Description: 'Запоріжжя', Ref: 'db5c88c6-391c-11dd-90d9-001a92567626' },
];

export function MakeOrderPage(props: MakeOrderProps) {
    const [cities, setCities] = useState<City[]>([]);
    const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
    const [cityQuery, setCityQuery] = useState("");
    const [isCitiesLoading, setIsCitiesLoading] = useState(false);
    const {user} = useUserContext()
    const [selectedCity, setSelectedCity] = useState<City | null>(null);
    const {items, totalPrice, discountedPrice, removeAll} = useCartContext()
    const [makeOrder, {isLoading, error}] = useMakeOrder()
    const navigate = useNavigate()
    const formatNum = useFormatNumber()
    const {setOpenModal} = props
    const {register, handleSubmit, formState, setError, reset, setValue, watch, control} = useForm<MakeOrderFormState>({
        defaultValues: { 
            deliveryType: 'warehouse',
            payment: 'pay_now',
            firstName: user?.firstName || '',
            lastName: user?.lastName || '',
            patronymic: user?.patronymic || "",
            phone: user?.phoneNumber || '',
            email: user?.email || '',
            city: '',
            warehouse: '',
            street: '',
        }
    })


    const selectedDelivery = watch("deliveryType");
    const selectedCityRef = watch("city");
    const selectedPayment = watch("payment");

    async function onSubmit(data: MakeOrderFormState) {
        const payload: MakeOrderCredentials = {
            userData: {
                secondName: data.lastName,
                firstName: data.firstName,
                patronymic: data.patronymic,
                phoneNumber: data.phone.slice(1),
                email: data.email,
                wishes: data.wishes
            },
            deliveryData: {
                city: data.city, 
                warehouse: data.warehouse,
                street: data.street
            },
            paymentData: {
                type: data.payment
            },
            productsToOrder: items.map(product => {
                return {
                    id: product.id,
                    count: product.count
                }
            })
        };
        const response = await makeOrder(payload)
        if ("error" in response && response.error) {
            setError("root", {message: "Помилка при створені замовлення, спробуйте пізніше"})
            return
        }
        removeAll()
        navigate("/order-complete")
    };

    useEffect(() => {
        if (cityQuery.length < 2) {
            setCities([]);
            return;
        }

        const delayDebounceFn = setTimeout(async () => {
            setIsCitiesLoading(true);
            try {
                const res = await fetch(`${API_URL}/orders/delivery/cities`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ cityName: cityQuery })
                });
                
                const data = await res.json();
                
                if (Array.isArray(data)) {
                    setCities(data);
                } else {
                    setCities([]);
                }
            } catch (error) {
                console.error("Помилка при пошуку міст:", error);
                setCities([]);
            } finally {
                setIsCitiesLoading(false);
            }
        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [cityQuery]);

    useEffect(() => {
        let isMounted = true; 

        if (!selectedCityRef) return;

        const fetchWarehouses = async () => {
            setWarehouses([]); 
            try {
                const res = await fetch(`${API_URL}/orders/delivery/warehouses`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ cityRef: selectedCityRef, deliveryType: selectedDelivery })
                });
                const data = await res.json();
                
                if (isMounted && Array.isArray(data)) {
                    setWarehouses(data);
                }
            } catch (e) {
                console.error(e);
            }
        };

        fetchWarehouses();

        return () => { isMounted = false; }; 
    }, [selectedCityRef, selectedDelivery]);
    
    const handleCitySelection = (city: City) => {
        setSelectedCity(city);
        setCityQuery(city.Description);
        setValue("city", city.Ref); 
        setValue("warehouse", "");
        setCities([])
    };

    const firstNameError = formState.errors.firstName
    const lastNameError = formState.errors.lastName
    const patronymicError = formState.errors.patronymic
    const phoneError = formState.errors.phone
    const emailError = formState.errors.email
    const wishesError = formState.errors.wishes
    const rootError = formState.errors.root

    return <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.leftSide}>
            <h1>оформити замовленя</h1>
            <div className={styles.completeInformation}>
                <hr />
                <h2>Ваші контактні дані</h2>
                <div className={styles.mainInfo}>
                    <label className={styles.formField}>
                        Призвіще:
                        <input type="text" className={lastNameError && styles.errorInput} placeholder="Ваше Призвіще" {...register("lastName", {
                            required: {
                                value: true,
                                message: "Призвіще є обов'язковим полем"
                            }
                        })} />
                        <p className={styles.error}>{lastNameError?.message}</p>
                    </label>
                    <label className={styles.formField}>
                        Ім'я:
                        <input type="text" className={firstNameError && styles.errorInput} placeholder="Ваше ім'я" {...register("firstName", {
                            required: {
                                value: true,
                                message: "Ім'я є обов'язковим полем"
                            }
                        })} />
                        <p className={styles.error}>{firstNameError?.message}</p>
                    </label>
                    <label className={styles.formField}>
                        По батькові:
                        <input type="text" className={patronymicError && styles.errorInput} placeholder="По батькові" {...register("patronymic", {
                            required: {
                                value: true,
                                message: "По батькові є обов'язковим полем"
                            }
                        })} />
                        <p className={styles.error}>{patronymicError?.message}</p>
                    </label>
                    <label className={styles.formField}>
                        Телефон:
                        <input type="text" className={phoneError && styles.errorInput} defaultValue={user?.phoneNumber} placeholder="+ 38 0" {...register("phone", {
                            required: {
                                value: true,
                                message: "Телефон є обов'язковим полем"
                            }
                        })} />
                        <p className={styles.error}>{phoneError?.message}</p>
                    </label>
                    <label className={styles.formField}>
                        E-mail:
                        <input type="text" className={emailError && styles.errorInput} defaultValue={user?.email} placeholder="Ваш E-mail" {...register("email", {
                            required: {
                                value: true,
                                message: "E-mail є обов'язковим полем"
                            }
                        })} />
                        <p className={styles.error}>{emailError?.message}</p>
                    </label>
                    
                    <label className={styles.formField}>
                        Коментар до замовлення:
                        <textarea className={wishesError && styles.errorInput} placeholder="Що б ви хотіли уточнити" {...register("wishes")} />
                        <p className={styles.error}>{wishesError?.message}</p>
                    </label>
                </div>
                <hr />
                <h2>Доставка</h2>
                <div>
                    <div className={styles.choiceList}>
                        {[
                            { id: 'postomat', label: 'Нова Пошта до поштомату', icon: <ICONS.newpost /> },
                            { id: 'warehouse', label: 'Нова Пошта до відділення', icon: <ICONS.newpost /> },
                            { id: 'express', label: 'Експрес-доставка по Києву', icon: null },
                            { id: 'courier', label: 'Нова Пошта кур’єром', icon: <ICONS.newpost /> }
                        ].map((opt) => (
                            <div key={opt.id} className={`${styles.choiceOption} ${selectedDelivery === opt.id ? styles.active : ''}`}>
                                <label className={styles.radioLabel}>
                                    <input type="radio" {...register("deliveryType")} value={opt.id} />
                                    <span className={styles.optionText}>{opt.label}</span>
                                    {opt.icon && <span className={styles.brandIcon}>{opt.icon}</span>}
                                </label>
                                
                                {selectedDelivery === opt.id && (
                                    <div className={styles.subFields}>
                                        {opt.id !== 'express' && (
                                            <div className={`${styles.inputWrapper} ${styles.formField}`}>
                                                <label>Місто</label>
                                                <input 
                                                    value={cityQuery}
                                                    onChange={(e) => {
                                                        setCityQuery(e.target.value);
                                                        setSelectedCity(null);
                                                    }}
                                                    className={styles.baseInput} 
                                                    placeholder="Введіть назву міста" 
                                                />
                                                
                                                <div className={styles.popularCities}>
                                                    {POPULAR_CITIES.map(pc => (
                                                        <button key={pc.Ref} type="button" className={styles.cityLink} onClick={() => handleCitySelection(pc)}>
                                                            {pc.Description}
                                                        </button>
                                                    ))}
                                                </div>

                                                {isCitiesLoading && <div>Пошук...</div>}
                                                {cities.length > 0 && !selectedCityRef && (
                                                    <ul className={styles.suggestionsList}>
                                                        {cities.map((city) => (
                                                            <li key={city.Ref} onClick={() => handleCitySelection(city)} style={{cursor: 'pointer', padding: '5px'}}>
                                                                {city.Description}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                )}
                                            </div>
                                        )}

                                        {(selectedDelivery === 'warehouse' || selectedDelivery === 'postomat') && (
                                            <div className={styles.inputWrapper}>
                                                <label>
                                                    {selectedDelivery === 'postomat' ? 'Оберіть поштомат' : 'Оберіть відділення'}
                                                </label>
                                                
                                                <Controller
                                                    name="warehouse"
                                                    control={control}
                                                    rules={{ required: true }}
                                                    render={({ field: { onChange, value, ref, onBlur, name } }) => {
                                                        const options = Array.isArray(warehouses) ? warehouses.map(w => ({
                                                            value: w.Ref,
                                                            label: `${w.Description} ${w.TotalMaxWeightAllowed === "0" ? "" : `(до ${w.TotalMaxWeightAllowed} кг)`}`
                                                        })) : [];
                                                        const selectedOption = options.find(o => o.value === value) || null;

                                                        return (
                                                            <Select
                                                                name={name}
                                                                ref={ref}
                                                                onBlur={onBlur}
                                                                options={options}
                                                                value={selectedOption}
                                                                onChange={(val) => onChange(val?.value)}
                                                                isDisabled={options.length === 0}
                                                                placeholder={`Почніть вводити назву ${selectedDelivery === 'postomat' ? "поштомату" :"відділення"}...`}
                                                                menuPortalTarget={document.body}
                                                                isClearable
                                                                isSearchable
                                                                styles={{
                                                                    menuPortal: base => ({ ...base, zIndex: 5 }),
                                                                    control: (base) => ({ ...base, borderColor: '#ccc', borderRadius: '8px' })
                                                                }}
                                                            />
                                                        );
                                                    }}
                                                />
                                                
                                                {selectedCity && warehouses.length === 0 && !isCitiesLoading && (
                                                    <p className={styles.error}>На жаль, за вашим запитом відділень не знайдено.</p>
                                                )}
                                            </div>
                                        )}
                                        {(opt.id === 'courier' || opt.id === 'express') && (
                                            <div className={styles.inputWrapper}>
                                                <label>Адреса доставки</label>
                                                <input {...register("street")} className={styles.baseInput} placeholder="Вулиця, будинок, квартира" />
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
                <hr />
                <h2>Оплата</h2>
                <div className={styles.paymentChoice}>
                    <div className={`${styles.choiceOption} ${selectedPayment === "pay_on_place" ? styles.active : ''}`}>
                        <label className={styles.radioLabel}>
                            <input type="radio" {...register("payment")} value="cash" />
                            <span className={styles.optionText}>Оплата при отриманні</span>
                        </label>
                    </div>

                    <div className={`${styles.choiceOption} ${['online','card','privat','apple','google'].includes(selectedPayment) ? styles.active : ''}`}>
                        <label className={styles.radioLabel}>
                            <input type="radio" {...register("payment")} value="online" />
                            <div className={styles.onlineHeader}>
                                <span className={styles.optionText}>Оплатити зараз</span>
                                <div className={styles.payIconsGroup}>
                                    <ICONS.Visa /> <ICONS.MasterCard /> <ICONS.ApplePay /> <ICONS.GooglePay />
                                </div>
                            </div>
                        </label>
                        {['online','card','privat','apple','google'].includes(selectedPayment) && (
                            <div className={styles.paymentSubList}>
                                {['card', 'privat', 'apple', 'google'].map((method) => (
                                    <label key={method} className={styles.subRadio}>
                                        <input type="radio" {...register("payment")} value={method} />
                                        <span>
                                            {method === 'card' && 'Карткою онлайн'}
                                            {method === 'privat' && 'Privat Pay'}
                                            {method === 'apple' && 'Apple Pay'}
                                            {method === 'google' && 'Google Pay'}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
                <div className={styles.boottomButtons}>
                    <Link className={styles.buttonCancel} to={"/"}>
                        Скасувати
                    </Link>
                </div>
            </div>
        </div>
        <div className={styles.rightSide}>
            <div className={styles.header}>
                <p className={`${styles.headerButton} ${styles.buttonActive}`}>Замовлення</p>
                <button onClick={setOpenModal} type='button' className={styles.editButton}>
                    <ICONS.Edit className={styles.editIcon} />
                </button>
            </div>
            <div className={styles.body}>
                <ProductsListWithoutControllers/>
                {
                    items.length === 0 ? null
                    : <div>
                        <hr className={styles.hr} />
                        <div className={styles.prices}>
                            <div className={styles.priceContainer}>
                                <p className={styles.namePrice}>Загальна сума</p>
                                <p className={styles.totalPrice}>{formatNum(totalPrice())} ₴</p>
                            </div>
                            <div className={styles.priceContainer}>
                                <p className={styles.namePrice}>Заощаджено</p>
                                <p className={styles.howMuchDiscounted}>- {formatNum(totalPrice() - discountedPrice())} ₴</p>
                            </div>
                            <div className={styles.priceContainer}>
                                <p className={styles.namePrice}>Доставка</p>
                                <p className={styles.howMuchDiscounted}>За тарифом перевізника</p>
                            </div>
                            <div className={styles.priceContainer}>
                                <p className={styles.namePrice}>Зі знижкою</p>
                                <p className={styles.discountPrice}>{formatNum(discountedPrice())} ₴</p>
                            </div>
                        </div>
                    </div>
                }
                <hr className={styles.hr} />
                <div className={styles.buttonsBottom}>
                    <button type='submit' className={`${styles.submitButton} ${(items.length === 0 || isLoading) && styles.disabledButton}`} disabled={items.length === 0 || isLoading}>
                        {
                            isLoading
                            ? <p>Оформлення замовлення</p>
                            : <p>Підтвердити замовлення</p> 
                        }
                    </button>
                </div>
                {rootError && <p className={styles.error}>{rootError.message}</p>}
            </div>
        </div>
    </form>
}