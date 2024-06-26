<template>
	<Transition>
		<div v-if="isVisible">
			<div class="modal-backdrop fade show"></div>
			<div
				class="modal fade show d-block"
				tabindex="-1"
				aria-labelledby="exampleModalLabel"
				aria-hidden="true"
			>
				<div class="modal-dialog">
					<div class="modal-content">
						<div class="modal-header">
							<h3>아이디 찾기</h3>
							<button @click="closeModal" class="close-button">X</button>
						</div>
						<div class="modal-body">
							<div class="form-group">
								<label for="name">이름</label>
								<input
									type="text"
									id="name"
									v-model="name"
									placeholder="이름을 입력하세요"
									required
								/>
							</div>
							<div class="form-group">
								<label for="email">이메일 주소</label>
								<input
									type="email"
									id="email"
									v-model="email"
									placeholder="이메일 주소를 입력하세요"
									required
								/>
							</div>
							<p v-if="errorMessage" class="error-message">
								{{ errorMessage }}
							</p>
							<p v-if="successMessage" class="success-message">
								{{ successMessage }}
							</p>
						</div>
						<div class="modal-footer">
							<button @click="findId" class="btn-confirm">확인</button>
							<button @click="closeModal" class="btn-close">닫기</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</Transition>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';

defineProps({
	isVisible: {
		type: Boolean,
		required: true,
	},
});

const emits = defineEmits(['close']);

const name = ref('');
const email = ref('');
const errorMessage = ref('');
const successMessage = ref('');

const closeModal = () => {
	emits('close');
};

const findId = async () => {
	try {
		const response = await axios.post('/api/member/find-id', {
			name: name.value,
			email: email.value,
		});
		if (response.data.success) {
			successMessage.value = '아이디는 ' + response.data.acuntId + ' 입니다.';
			errorMessage.value = '';
		} else {
			errorMessage.value = '아이디 찾기 실패: ' + response.data.message;
			successMessage.value = '';
		}
	} catch (error) {
		console.error(error);
		errorMessage.value = '아이디 찾기 중 오류가 발생했습니다.';
		successMessage.value = '';
	}
};
</script>

<style scoped>
.v-enter-from,
.v-leave-to {
	opacity: 0;
}
.v-enter-active,
.v-leave-active {
	transition: all 0.5s ease;
}
.v-enter-to,
.v-leave-from {
	opacity: 1;
}

.modal-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 20px;
}

.close-button {
	background: none;
	border: none;
	font-size: 1.2em;
	cursor: pointer;
}

.modal-body {
	margin-bottom: 20px;
}

.modal-footer {
	display: flex;
	justify-content: flex-end;
	gap: 10px;
}

.form-group {
	margin-bottom: 10px;
	display: flex;
	flex-direction: column;
}

.form-group label {
	margin-bottom: 5px;
	font-weight: bold;
}

.form-group input {
	padding: 8px;
	border: 1px solid #ccc;
	border-radius: 4px;
	font-size: 1em;
}

.error-message {
	color: red;
}

.success-message {
	color: green;
}

.btn-confirm,
.btn-close {
	padding: 10px 20px;
	border: none;
	border-radius: 5px;
	cursor: pointer;
}

.btn-confirm {
	background-color: #007bff;
	color: white;
}

.btn-close {
	background-color: #6c757d;
	color: white;
}
</style>
