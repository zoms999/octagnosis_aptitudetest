<template>
	<div class="result">
		<div class="result-sheet">
			<div class="result-view">
				<p class="name">{{ Props.ListItem.PersnNm }}</p>
				<p class="headline" v-html="$t('RsltThink_1')">
					
				</p>
				<div class="summary">
					<div class="thinking">
						<div class="type-list mint">
							<dl>
								<dt>
									<img src="@/assets/img/sub/img_star.png" alt="" />
								</dt>
								<dd>{{ Rslt1[0].thkm }}</dd>
							</dl>
							<dl>
								<dt>
									<img src="@/assets/img/sub/img_star.png" alt="" />
								</dt>
								<dd>{{ Rslt1[0].thks }}</dd>
							</dl>
						</div>
					</div>
					<p class="text mt-4">
						{{ $t('RsltThink_2').replaceAll('000', Props.ListItem.PersnNm) }}
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

				<div class="partition" v-for="(item, idx) in Rslt3" :key="idx">
					<div class="title-wrap">
						<p class="tit v2">{{ item.QuestAttrNm }} ({{ item.score }} {{$t('points')}})</p>
					</div>
					<div class="text-wrap">
						<p>
							<div v-html="item.Expl.replace(/(\r\n|\n|\r)/g, '<br />').replaceAll('님', Props.ListItem.PersnNm + '님')"></div>
						</p>
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
	getRsltThink();
});

// Model / Data  ****************************

const Parm = ref({
	ansPrgrsId: 0,
});

const Rslt1 = ref([{thkm:'',thks:'',}]);
const Rslt2 = ref({});
const Rslt3 = ref({});

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
const chart1Ref = ref(null);
const chart2Ref = ref(null);

// Html ref  ********************************

// Axios / Route  ***************************

const Procs = ref({
	getRsltThink: { path: '/api/Test/getRsltThink', loading: false },
});

const { data, execUrl, reqUrl } = useAxios(
	'',
	{ method: 'post' },
	{
		immediate: false,
		onSuccess: () => {
			switch (reqUrl.value) {
				case Procs.value.getRsltThink.path:
					Procs.value.getRsltThink.loading = false;
					Rslt1.value = data.value.Rslt1;
					Rslt2.value = data.value.Rslt2;
					Rslt3.value = data.value.Rslt3;

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

const getRsltThink = () => {
	Parm.value.ansPrgrsId = Props.ListItem.AnsPrgrsId;

	execUrl(Procs.value.getRsltThink.path, Parm.value);
};

const setChart = () => {
	var labels1 = [];
	var data1 = [];

	Rslt2.value.forEach(item => {
		labels1.push(item.QuestAttrNm);
		data1.push(item.thkSum);
	});

	ChartData1 = {
		labels: labels1,
		datasets: [
			{
				label: t('RsltThink_3'),
				backgroundColor: '#f87979',
				data: data1,
			},
		],
	};

	ChartData2 = {
		labels: labels1,
		datasets: [
			{
				label: t('RsltThink_4'),
				backgroundColor: 'rgba(255,99,132,0.2)',
				borderColor: 'rgba(255,99,132,1)',
				pointBackgroundColor: 'rgba(255,99,132,1)',
				pointBorderColor: '#fff',
				pointHoverBackgroundColor: '#fff',
				pointHoverBorderColor: 'rgba(255,99,132,1)',
				data: data1,
			},
		],
	};

	if (chart1Ref.value) {
		new Chart(chart1Ref.value, {
			type: 'bar',
			data: ChartData1,
			options: ChartOptions1,
		});
	}

	if (chart2Ref.value) {
		new Chart(chart2Ref.value, {
			type: 'radar',
			data: ChartData2,
			options: ChartOptions2,
		});
	}

	chartLoadYn.value = true;
};

// Etc  *************************************
</script>

<style scoped>
@import url(@/assets/common.css);
@import url(@/assets/components.css);
@import url(@/assets/main.css);
@import url(@/assets/sub.css);
@import url(@/assets/utility.css);

.chart1 {
	width: 40%;
	height: 320px;
}
.chart2 {
	width: 60%;
	height: 320px;
}

</style>
