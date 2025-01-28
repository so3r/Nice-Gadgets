import { useState, useEffect, FormEvent } from 'react';
import './SubmitForm.scss';
import { City } from '../../types/City';
import { Warehouse } from '../../types/Warehouse';
import { fetchCities, fetchWarehouses } from '../../features/postAddresses';
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';
import { getMapAddress, apiKey } from '../../features/mapAddress';

interface Props {
  openModal: React.Dispatch<React.SetStateAction<boolean>>;
  openForm: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SubmitForm: React.FC<Props> = ({ openModal, openForm }) => {
  const [cities, setCities] = useState<City[]>([]);
  const [cityName, setCityName] = useState('');
  const [cityRef, setCityRef] = useState<string | null>(null);
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
  const [warehousesName, setWarehousesName] = useState('');
  const [coordinates, setCoordinates] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    openModal(true);
    openForm(false);
  };

  const cancel = (e: React.MouseEvent) => {
    e.preventDefault();
    openForm(false);
  };

  useEffect(() => {
    fetchCities().then(setCities);
  }, []);

  useEffect(() => {
    if (cityRef) {
      fetchWarehouses(cityRef).then(setWarehouses);
    }
  }, [cityRef]);

  useEffect(() => {
    const city = cities.find(
      (city) => city.Description.toLowerCase() === cityName.toLowerCase(),
    );

    if (city) setCityRef(city.Ref);
    else setCityRef(null);
  }, [cities, cityName]);

  useEffect(() => {
    getMapAddress(`${warehousesName}, ${cityName}`).then(setCoordinates);
  }, [cityName, warehousesName]);

  const setRefOfCity = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCityName(e.target.value);

    if (warehousesName) {
      setWarehousesName('');
    }
  };

  const addressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWarehousesName(e.target.value);
  };

  return (
    <>
      <form
        className="form"
        onSubmit={submit}
      >
        <ul className="form__list">
          <li className="form__list__item">
            <label>Name: </label>
            <input
              className="form__list__item__input"
              type="text"
              required
            />
          </li>

          <li className="form__list__item">
            <label>Phone: </label>
            <input
              className="form__list__item__input"
              type="tel"
              pattern="^[0-9]+$"
              required
            />
          </li>

          <li className="form__list__item">
            <label>Mail: </label>
            <input
              className="form__list__item__input"
              type="email"
              required
            />
          </li>

          <li className="form__list__item">
            <label>City: </label>
            <input
              className="form__list__item__input"
              type="text"
              list="cities"
              value={cityName}
              onChange={setRefOfCity}
              required
            />
            <datalist id="cities">
              {cities.map((city) => (
                <option
                  key={city.Ref}
                  value={city.Description}
                />
              ))}
            </datalist>
          </li>

          {cityRef && (
            <li className="form__list__item">
              <label>Address: </label>
              <input
                className="form__list__item__input"
                type="text"
                list="warehouses"
                value={warehousesName}
                onChange={addressChange}
                required
              />
              <datalist id="warehouses">
                {warehouses.map((warehouse) => (
                  <option
                    key={warehouse.PlaceRef}
                    value={warehouse.Description}
                  />
                ))}
              </datalist>
            </li>
          )}
        </ul>

        <div className="form__button-holder">
          <button className="form__button-holder__button-submit">Submit</button>
          <button
            className="form__button-holder__button-cancel"
            onClick={cancel}
          >
            Cancel
          </button>
        </div>
      </form>

      {coordinates && (
        <APIProvider apiKey={apiKey}>
          <div className="map">
            <Map
              zoom={16}
              center={coordinates}
            >
              <Marker position={coordinates} />
            </Map>
          </div>
        </APIProvider>
      )}
    </>
  );
};
