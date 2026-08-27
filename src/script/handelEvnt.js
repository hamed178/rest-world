import { reqJson } from './getdata.js';
import { renderCard } from './helper.js';

const list = document.querySelector('.country-list');

class Genral {
    #data = [];

    async Render() {
        try {
            list.innerHTML = "";
            this.#data = [];

            const result = await reqJson(
                'https://api.restcountries.com/countries/v5?response_fields=names.common,names.official,flag,currencies,population,capitals,region,borders,languages,codes.alpha_2,codes.alpha_3',
                {
                    headers: {
                        Authorization:
                            'Bearer rc_live_7bf72076d32b4169a7d6606ac99ed8d6'
                    }
                }
            );

            renderCard({}, 'spiner');

            // Convert v5 data to the structure your old project expects
            const data = result.data.objects.map(country => ({
                name: {
                    common: country.names?.common || "",
                    official: country.names?.official || ""
                },

                flags: {
                    png: country.flag?.png || "",
                    svg: country.flag?.svg || "",
                    alt: country.flag?.alt || ""
                },

                currencies: country.currencies || {},

                population: country.population || 0,

                capital: country.capitals || [],

                region: country.region || "",

                borders: country.borders || [],

                languages: country.languages || {},

                cca2: country.codes?.alpha_2 || "",

                cca3: country.codes?.alpha_3 || ""
            }));

            this.#data = data;

            list.innerHTML = "";

            data.forEach(country => {
                renderCard(country, 'data');
            });

        } catch (error) {
            console.error(error);

            list.innerHTML = "";
            renderCard(error.message, 'error');
        }
    }

    Seletion() {
        const option = document.querySelector('#selection');

        option.addEventListener('change', (ev) => {

            if (!ev.target.value) return;

            renderCard({}, 'spiner');

            const selData = this.#data.filter(
                country => country.region === ev.target.value
            );

            list.innerHTML = "";

            setTimeout(() => {
                selData.forEach(country => {
                    renderCard(country, 'data');
                });
            }, 500);
        });
    }

    Search() {
        const input = document.querySelector('#inupt');

        input.addEventListener('keyup', (e) => {

            const val = e.target.value.toLowerCase();

            const selData = this.#data.filter(country => {

                const name =
                    country.name.common?.toLowerCase() || "";

                const cca2 =
                    country.cca2?.toLowerCase() || "";

                const cca3 =
                    country.cca3?.toLowerCase() || "";

                return (
                    name.includes(val) ||
                    cca2.includes(val) ||
                    cca3.includes(val)
                );
            });

            renderCard({}, 'spiner');

            if (selData.length > 0) {

                list.innerHTML = "";

                setTimeout(() => {
                    selData.forEach(country => {
                        renderCard(country, 'data');
                    });
                }, 500);

            } else {

                list.innerHTML = "";

                renderCard(
                    'enter a valid country name..',
                    'error'
                );
            }
        });
    }
}

export default new Genral();
