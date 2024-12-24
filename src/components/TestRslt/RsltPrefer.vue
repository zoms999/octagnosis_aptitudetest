<template>
	<div class="result">
		<div class="result-sheet">
			<div class="result-view">
				<p class="name">{{ Props.ListItem.PersnNm }}</p>
				<p class="headline" v-html="$t('RsltPrefer_1')"></p>
				<div class="summary">
					<p class="text">
						{{ $t('RsltPrefer_2').replaceAll('000', Props.ListItem.PersnNm) }}
					</p>
				</div>

				<div class="chart-wrap d-flex justify-content-center">
					<div class="p-3 chart1">
						<canvas ref="chart1Ref"></canvas>
					</div>
					<div class="p-3 chart2">
						<canvas ref="chart2Ref"></canvas>
					</div>
				</div>

				<p
					class="tit v3 mt-4"
					v-html="
						$t('RsltPrefer_3')
							.replaceAll('000', Props.ListItem.PersnNm)
							.replaceAll('PREFER', Rslt2[0] == null ? '-' : Rslt2[0].tdname1)
							.replaceAll('RATE', Rslt2[0] == null ? '-' : Rslt2[0].rrate1)
					"
				></p>

				<p class="txt-comment mt5">
					<strong>{{ Rslt2[0] == null ? '-' : Rslt2[0].tdname1 }} </strong> :
					{{ Rslt2[0].exp1 }}
				</p>

				<div class="hide-mobile mt10">
					<div class="tbl-wrap v2">
						<table>
							<colgroup>
								<col style="width: 10.092%" />
								<col style="width: 32.111%" />
								<col style="width: 32.111%" />
								<col style="width: 25.688%" />
							</colgroup>
							<thead>
								<tr>
									<th class="ta-l">{{ $t('RsltPrefer_4') }}</th>
									<th>{{ $t('RsltPrefer_5') }}</th>
									<th>{{ $t('RsltPrefer_6') }}</th>
									<th>{{ $t('RsltPrefer_7') }}</th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="(item, idx) in Rslt3" :key="idx">
									<td class="va-t ta-l">{{ item.JobNm }}</td>
									<td class="va-t ta-l">
										{{ item.Expl }}
									</td>
									<td class="va-t ta-l">
										{{ item.MainWork }}
									</td>
									<td class="va-t ta-l">
										{{ item.major }}
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
				<p
					class="tit v3 mt-4"
					v-html="
						$t('RsltPrefer_3')
							.replaceAll('000', Props.ListItem.PersnNm)
							.replaceAll('PREFER', Rslt2[0] == null ? '-' : Rslt2[0].tdname2)
							.replaceAll('RATE', Rslt2[0] == null ? '-' : Rslt2[0].rrate2)
					"
				></p>

				<p class="txt-comment mt5">
					<strong>{{ Rslt2[0].tdname2 }} </strong> :
					{{ Rslt2[0].exp2 }}
				</p>

				<div class="tbl-wrap v2">
					<table>
						<colgroup>
							<col style="width: 10.092%" />
							<col style="width: 32.111%" />
							<col style="width: 32.111%" />
							<col style="width: 25.688%" />
						</colgroup>
						<thead>
							<tr>
								<th class="ta-l">{{ $t('RsltPrefer_4') }}</th>
								<th>{{ $t('RsltPrefer_5') }}</th>
								<th>{{ $t('RsltPrefer_6') }}</th>
								<th>{{ $t('RsltPrefer_7') }}</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(item, idx) in Rslt4" :key="idx">
								<td class="va-t ta-l">{{ item.JobNm }}</td>
								<td class="va-t ta-l">
									{{ item.Expl }}
								</td>
								<td class="va-t ta-l">
									{{ item.MainWork }}
								</td>
								<td class="va-t ta-l">
									{{ item.major }}
								</td>
							</tr>
						</tbody>
					</table>
				</div>

				<p
					class="tit v3 mt-4"
					v-html="
						$t('RsltPrefer_3')
							.replaceAll('000', Props.ListItem.PersnNm)
							.replaceAll('PREFER', Rslt2[0] == null ? '-' : Rslt2[0].tdname3)
							.replaceAll('RATE', Rslt2[0] == null ? '-' : Rslt2[0].rrate3)
					"
				></p>

				<p class="txt-comment mt5">
					<strong>{{ Rslt2[0] == null ? '-' : Rslt2[0].tdname3 }} </strong> :
					{{ Rslt2[0] == null ? '-' : Rslt2[0].exp3 }}
				</p>

				<div class="hide-mobile mt10">
					<div class="tbl-wrap v2">
						<table>
							<colgroup>
								<col style="width: 10.092%" />
								<col style="width: 32.111%" />
								<col style="width: 32.111%" />
								<col style="width: 25.688%" />
							</colgroup>
							<thead>
								<tr>
									<th class="ta-l">{{ $t('RsltPrefer_4') }}</th>
									<th>{{ $t('RsltPrefer_5') }}</th>
									<th>{{ $t('RsltPrefer_6') }}</th>
									<th>{{ $t('RsltPrefer_7') }}</th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="(item, idx) in Rslt5" :key="idx">
									<td class="va-t ta-l">{{ item.JobNm }}</td>
									<td class="va-t ta-l">
										{{ item.Expl }}
									</td>
									<td class="va-t ta-l">
										{{ item.MainWork }}
									</td>
									<td class="va-t ta-l">
										{{ item.major }}
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { onMounted, ref, computed, watch, reactive } from 'vue';
import { useAlert } from '@/hooks/useAlert';
import { useAxios } from '@/hooks/useAxios';
import { Chart, registerables } from 'chart.js';
import { useI18n } from 'vue-i18n';

Chart.register(...registerables);

const { vAlert, vSuccess } = useAlert();
const { t } = useI18n(); // Import translation function

// Props / Emit  ****************************

const Props = defineProps({ ListItem: { type: Object } });

// Hook  ************************************
onMounted(() => {
	getRsltPrefer();
});

// Model / Data  ****************************

const Parm = ref({
	ansPrgrsId: 0,
});

const Rslt1 = ref([{ tcnt: '0', cnt: '0', irate: '0' }]);
const Rslt2 = ref([
	{
		tdname1: '',
		qcnt1: '',
		rrate1: '',
		tdname2: '',
		qcnt2: '',
		rrate2: '',
		tdname3: '',
		qcnt3: '',
		rrate3: '',
		exp1: '',
		exp2: '',
		exp: '',
	},
]);
const Rslt3 = ref({});
const Rslt4 = ref({});
const Rslt5 = ref({});

// chartData와 chartOptions 상태 정의
var ChartData1 = reactive();
var ChartOptions1 = {
	responsive: true,
	maintainAspectRatio: false,
};

var ChartData2 = reactive();
var ChartOptions2 = {
	responsive: true,
	maintainAspectRatio: false,
};

const chartLoadYn = ref(false);

// Html ref  ********************************

const chart1Ref = ref(null);
const chart2Ref = ref(null);

// Axios / Route  ***************************

const Procs = ref({
	getRsltPrefer: { path: '/api/Test/getRsltPrefer', loading: false },
});

const { data, execUrl, reqUrl } = useAxios(
	'',
	{ method: 'post' },
	{
		immediate: false,
		onSuccess: () => {
			switch (reqUrl.value) {
				case Procs.value.getRsltPrefer.path:
					Procs.value.getRsltPrefer.loading = false;
					Rslt1.value = data.value.Rslt1;
					Rslt2.value = data.value.Rslt2;
					Rslt3.value = data.value.Rslt3;
					Rslt4.value = data.value.Rslt4;
					Rslt5.value = data.value.Rslt5;

					setChart();

					break;
			}
		},
		onError: err => {
			vAlert(err.message);
			// Procs의 모든 속성에 대해 반복문을 실행하여 loading 값을 true로 변경
			for (const key in Procs.value) {
				if (Object.hasOwnProperty.call(Procs.value, key)) {
					Procs.value[key].loading = false;
				}
			}
		},
	},
);

// Modal  ***********************************

// Watch  ***********************************

// Method  **********************************

const getRsltPrefer = () => {
	Parm.value.ansPrgrsId = Props.ListItem.AnsPrgrsId;

	execUrl(Procs.value.getRsltPrefer.path, Parm.value);
};

const setChart = () => {
	if (chart1Ref.value) {
		new Chart(chart1Ref.value, {
			type: 'bar',
			data: {
				labels: [`${t('RsltPrefer_9')} (${Rslt1.value[0].irate}%)`],
				datasets: [{
					label: t('RsltPrefer_9'),
					backgroundColor: '#f87979',
					data: [Rslt1.value[0].irate],
					barThickness: 30,
				}],
			},
			options: {
				responsive: true,
				maintainAspectRatio: false,
				scales: {
					y: {
						beginAtZero: true,
						max: 100,
					},
				},
			},
		});
	}

	if (chart2Ref.value && Rslt2.value[0]) {
		const labels = [];
		const data = [];
		const rates = ['rrate1', 'rrate2', 'rrate3'];
		const names = ['tdname1', 'tdname2', 'tdname3'];
		const barColors = ['#FF9F9F', '#9FD5FF', '#B8F3B8'];

		for (let i = 0; i < 3; i++) {
			const rate = rates[i];
			const name = names[i];
			if (Rslt2.value[0][rate] && Rslt2.value[0][name]) {
				labels.push(`${Rslt2.value[0][name]} (${Rslt2.value[0][rate]}%)`);
				data.push(Rslt2.value[0][rate]);
			}
		}

		new Chart(chart2Ref.value, {
			type: 'bar',
			data: {
				labels: labels,
				datasets: [{
					label: t('RsltPrefer_10'),
					backgroundColor: barColors.slice(0, data.length),
					data: data,
					barThickness: 30,
				}],
			},
			options: {
				responsive: true,
				maintainAspectRatio: false,
				scales: {
					y: {
						beginAtZero: true,
						max: 100,
					},
				},
			},
		});
	}
};

// Etc  *************************************
</script>
<style scoped>
@import url(@/assets/common.css);
@import url(@/assets/components.css);
@import url(@/assets/main.css);
@import url(@/assets/sub.css);
@import url(@/assets/utility.css);

.chart-wrap {
	max-width: 800px;
	margin: 0 auto;
	padding: 0.5rem;
}

.chart1 {
	width: 30%;
	max-width: 150px;
	height: 250px;
}
.chart2 {
	width: 70%;
	max-width: 650px;
	height: 250px;
}
</style>
